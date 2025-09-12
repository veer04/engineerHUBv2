import React from 'react';
import './NotificationBadge.css';

const NotificationBadge = ({ count, type = 'unread', className = '' }) => {
  // Don't render badge if count is 0 or null
  if (!count || count === 0) return null;

  // Format count display (show 99+ for counts over 99)
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <span 
      className={`notification-badge ${type} ${className}`}
      title={`${count} ${type === 'unread' ? 'unread messages' : 'new messages today'}`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;
