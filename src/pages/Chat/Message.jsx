import React, { useEffect,useState} from "react";
import ReactDOM from "react-dom";
import "./Message.css";
import verifiedIcon from "./svg/verified.svg";
import options from "./svg/options.svg";
import defaultPoster from "../../assets/defaultPoster";
import { useNavigate } from "react-router-dom";
import {FiMoreVertical } from "react-icons/fi";


// Special users mapping - email to display role
const SPECIAL_USERS = {
  "rishabhs883@gmail.com": "Admin",
  // Add more special users here as needed
  // "another@example.com": "Moderator",
};

// Helper function to get display role for special users
const getDisplayRole = (sender) => {
  // Check if user is in special users list
  if (sender?.email && SPECIAL_USERS[sender.email]) {
    return SPECIAL_USERS[sender.email];
  }
  
  // Default role display logic
  if (sender?.role === "Admin") {
    return "Admin";
  }
  
  return sender?.role;
};

export default function Message({
  messages,
  index,
  sender,
  isVerified,
  tags,
  content,
  clientId,
  createdAt,
  position,
  replyTo, // Backend reply data
  onReply, // Add onReply prop to handle reply functionality
  attachments, // PDF attachments
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isMobileActive, setIsMobileActive] = useState(false);
  const navigate = useNavigate();

  // Debug: Log the message props
  console.log('Message component props:', { attachments, content, sender: sender?.firstName });

  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   (window.innerWidth <= 768 && 'ontouchstart' in window);

  // Handle mobile tap on message content
  const handleMessageContentTap = (e) => {
    if (isMobile) {
      // Don't interfere if user clicked on a link
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      setIsMobileActive(!isMobileActive);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setIsMobileActive(false);
      }, 3000);
    }
  };

  // Helper function to extract actual message content (without embedded reply format)
  const getActualMessageContent = () => {
    // If this message has valid backend reply data, the content is already clean
    if (replyTo && replyTo.messageId && replyTo.isReply === true) {
      return content;
    } 
    
    // Check if this is an old embedded reply format and extract actual content
    const replyRegex = /^@([^:]+):\s*"([^"]+)"\s*\n\n(.+)$/s;
    const replyMatch = content.match(replyRegex);
    
    if (replyMatch) {
      // This is an embedded reply, extract the actual message part
      const [, , , actualMessage] = replyMatch;
      return actualMessage;
    }
    
    // Regular message, return as is
    return content;
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!showMenu) {
      // Calculate position for portal dropdown
      const buttonRect = e.currentTarget.getBoundingClientRect();
      const dropdownWidth = 120;
      const dropdownHeight = 80;
      
      let left = buttonRect.left;
      let top = buttonRect.bottom + 5;
      
      // Adjust for my messages vs others
      const isMyMessage = sender?._id === clientId;
      if (isMyMessage) {
        left = buttonRect.left - dropdownWidth + buttonRect.width;
      }
      
      // Ensure dropdown doesn't go off-screen
      if (left < 10) left = 10;
      if (left + dropdownWidth > window.innerWidth - 10) {
        left = window.innerWidth - dropdownWidth - 10;
      }
      if (top + dropdownHeight > window.innerHeight - 10) {
        top = buttonRect.top - dropdownHeight - 5;
      }
      
      setDropdownPosition({ top, left });
    }
    
    setShowMenu(!showMenu);
  };

  const handleCopy = () => {
    const actualContent = getActualMessageContent();
    navigator.clipboard.writeText(actualContent);
    setShowMenu(false);
  };

  const handleReply = () => {
    if (onReply) {
      const actualContent = getActualMessageContent();
      
      onReply({
        messageId: messages[index]._id || index,
        content: actualContent,
        sender: sender,
        createdAt: createdAt
      });
    }
    setShowMenu(false);
  };

  const handleOpenDocument = () => {
    if (attachments && attachments.length > 0) {
      // Open the first attachment in a new tab
      window.open(attachments[0].url, '_blank', 'noopener,noreferrer');
    }
    setShowMenu(false);
  };

  // Close menu when clicking outside, pressing Escape, scrolling, or resizing
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest('.message-actions') && !e.target.closest('.message-dropdown-portal')) {
        setShowMenu(false);
      }
    };

    const handleTouchOutside = (e) => {
      if (showMenu && !e.target.closest('.message-actions') && !e.target.closest('.message-dropdown-portal')) {
        setShowMenu(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showMenu) {
        setShowMenu(false);
      }
    };

    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    const handleResize = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      // Add a delay to prevent immediate closing on mobile
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('touchstart', handleTouchOutside);
        document.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);
      }, 200); // Increased delay for better mobile stability
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('touchstart', handleTouchOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [showMenu]);

  const date = new Date(createdAt);
  //function to convert date to a readable format in the concept of chats
  function convertDate(date) {
    const now = new Date();
    const timeDiff = now - date;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      return `${day} ${month} ${year}`;
    }
  }

  const MY_USER_ID = clientId;
  const isMyMessage = sender?._id === MY_USER_ID;

  const isSameSender = messages[index - 1]?.sender?._id === sender?._id;

  const chatMessageClasses = `chat-message ${
    isMyMessage ? "chat-message--flipped" : ""
  }`;

  const messageContainerClasses = `message-container ${
    isMyMessage ? "message-container--flipped" : ""
  } ${
    isSameSender && !isMyMessage && content && sender?.firstName
      ? "message-container--horizontal-oriental"
      : ""
  }`;

  const messageHeaderClasses = `message-header ${
    isMyMessage ? "message-header--flipped" : ""
  }`;

  const messageBodyClasses = `message-body ${
    isMyMessage ? "message-body--flipped" : ""
  }`;

  const handleReplyQuoteClick = (messageId) => {
    // Try to find and scroll to the original message
    const originalMessageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (originalMessageElement) {
      originalMessageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a temporary highlight effect
      originalMessageElement.classList.add('highlighted-message');
      setTimeout(() => {
        originalMessageElement.classList.remove('highlighted-message');
      }, 2000);
    }
  };

  const renderMessageContent = (text, replyData) => {
    // Only render as reply if we have valid reply data with messageId and isReply flag
    if (replyData && replyData.messageId && replyData.isReply === true) {
      const replyToUser = replyData.sender?.firstName 
        ? `${replyData.sender.firstName}${replyData.sender.lastName ? ' ' + replyData.sender.lastName : ''}`
        : 'User';
      
      return (
        <div className="reply-message-container">
          <div 
            className="reply-quote clickable-reply" 
            onClick={() => handleReplyQuoteClick(replyData.messageId)}
            title="Click to jump to original message"
          >
            <div className="reply-to-user">@{replyToUser}</div>
            <div className="quoted-text">"{replyData.content}"</div>
          </div>
          <div className="actual-message">
            {renderTextWithLinks(text)}
          </div>
        </div>
      );
    }
    
    // Check if this is an old embedded reply message (backward compatibility)
    const replyRegex = /^@([^:]+):\s*"([^"]+)"\s*\n\n(.+)$/s;
    const replyMatch = text.match(replyRegex);
    
    if (replyMatch) {
      const [, replyToUser, quotedText, actualMessage] = replyMatch;
      return (
        <div className="reply-message-container">
          <div className="reply-quote">
            <div className="reply-to-user">@{replyToUser}</div>
            <div className="quoted-text">"{quotedText}"</div>
          </div>
          <div className="actual-message">
            {renderTextWithLinks(actualMessage)}
          </div>
        </div>
      );
    }
    
    return renderTextWithLinks(text);
  };

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <span key={index} className="link-margin mx-1">
            <a
              style={{ color: "rgb(124, 170, 243)" }}
              className="text-break"
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // Ensure link opens properly on mobile
                e.stopPropagation();
                window.open(part, '_blank', 'noopener,noreferrer');
              }}
              onTouchStart={(e) => {
                // Prevent event bubbling on touch start
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                // Prevent event bubbling on touch end
                e.stopPropagation();
              }}
            >
              {part}
            </a>
          </span>
        );
      } else {
        return (
          <span key={index} className="text-content">
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div
      style={{
        marginTop: isSameSender ? "0rem" : ".75rem",
      }}
      className={chatMessageClasses}
      data-message-id={messages[index]._id}
    >
      {!isMyMessage && (
        <div className="avatar-container"
        onClick={() => {
          navigate(`/profile/user/${sender?._id}`);
        }}
        >
          
          {(!isSameSender || (content && !sender?.firstName)) && (
            <img
              className="avatar"
              src={sender?.image ? sender?.image : defaultPoster}
              alt="avatar"
            />
          )}
        </div>
      )}
      <div className={messageContainerClasses}>
      

        <div className={messageHeaderClasses}>
          {content && !sender?.firstName ? (
            <i className="name">Deleted User</i>
          ) : isMyMessage ? (
            ""
          ) : isSameSender ? (
            content && !sender?.firstName ? (
              <i className="name">Deleted User</i>
            ) : (
              ""
            )
          ) : (
            <div className="name" 
            onClick={() => {
              navigate(`/profile/user/${sender?._id}`);
            }}
            >{`${sender?.firstName} ${
              sender?.lastName ? sender?.lastName : ""
            }`}</div>
          )}
          {/* {!isMyMessage && !isSameSender && content && !sender?.firstName ? (
            <i className="name">Deleted User</i>
          ) : (
            <div className="name">{sender?.firstName}</div>
          )} */}
          {/* {content && !sender?.firstName && <i className="name">Deleted User</i>} */}
          {sender?.verifiedByEhub && !isMyMessage && !isSameSender && (
            <img src={verifiedIcon} alt="verified" />
          )}
        </div>
        {!isSameSender && !isMyMessage && (
          <div className="tags">
            {
              sender?.role &&
                (sender?.role === "Alumni" ||
                  sender?.role === "Mentor" ||
                  sender?.role === "Admin") && (
                  // sender.role?.map((tag) => {
                  //   return (
                  <div key={sender?.role} className="tag">
                    {getDisplayRole(sender)}
                  </div>
                )
              // );
              // }
              // )
            }
          </div>
        )}
        <div className={messageBodyClasses}>
          {content && content.trim() && (
            <div 
              className={`message-content text-break d-flex ${isMobileActive ? 'mobile-active' : ''}`}
              onTouchEnd={handleMessageContentTap}
            >
              <div className={`message-actions ${isMyMessage ? 'my-message': 'other-message'}`}>
                <button
                  className={`three-dot-buttons ${isMyMessage ? 'my-message': 'other-message'}`}
                  onClick={handleMenuClick}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuClick(e);
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <FiMoreVertical size={16}/>
                </button>
                {/* Portal dropdown to ensure it appears above all other elements */}
                {showMenu && ReactDOM.createPortal(
                  <div 
                    className={`message-dropdown-portal ${isMyMessage ? 'my-message': 'other-message'}`}
                    style={{
                      position: 'fixed',
                      top: `${dropdownPosition.top}px`,
                      left: `${dropdownPosition.left}px`,
                      zIndex: 999999999,
                      background: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      minWidth: '120px',
                      overflow: 'hidden'
                    }}
                  >
                    <button onClick={handleReply} className="dropdown-item">Reply</button>
                    <button onClick={handleCopy} className="dropdown-item">Copy Text</button>
                    {attachments && attachments.length > 0 && (
                      <button onClick={handleOpenDocument} className="dropdown-item">Open Document</button>
                    )}
                  </div>,
                  document.body
                )}
              </div>
              {renderMessageContent(content, replyTo)}
            </div>
          )}
          {/* PDF Attachments */}
          {attachments && attachments.length > 0 && (
            <div className="message-attachments">
              {attachments.map((attachment, index) => (
                <div key={index} className="attachment-display">
                  <div 
                    className="attachment-preview clickable-document"
                    onClick={() => window.open(attachment.url, '_blank', 'noopener,noreferrer')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="attachment-icon">
                      <i className="fas fa-file-pdf"></i>
                    </div>
                    <div className="attachment-info">
                      <div className="attachment-name">{attachment.originalName}</div>
                      <div className="attachment-size">
                        {(attachment.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="attachment-download"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-download"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <div
            style={{ lineBreak: "anywhere" }}
            className="message text-break d-flex"
          >
            {checkForLink(content)}
          </div> */}
          <div className="time">{convertDate(date)}</div>
        </div>
      </div>
    </div>
  );
} 
