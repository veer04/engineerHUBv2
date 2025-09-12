import { useEffect, useState } from "react";
import CommunityChatGroupListGroup from "./CommunityChatGroupListGroup";
import { getDomains } from "../../services/APIConfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import { getAccessToken } from "../../features/User/UserDetails";
import useChatNotifications from "../../hooks/useChatNotifications";

export default function CommunityChatGroupList() {
  const { notificationData } = useChatNotifications();
  const [hasAutoJoined, setHasAutoJoined] = useState(() => {
    // Check if user has already been auto-joined (stored in localStorage)
    const accessToken = getAccessToken();
    if (!accessToken) return true; // Not logged in, skip auto-join
    
    const autoJoinKey = `chat_auto_joined_${accessToken.slice(-10)}`; // Use last 10 chars of token as key
    return localStorage.getItem(autoJoinKey) === 'true';
  });
  
  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };

  // Auto-join all community chats when component mounts (if user is logged in and hasn't been auto-joined)
  useEffect(() => {
    const autoJoinChats = async () => {
      const accessToken = getAccessToken();
      if (accessToken && !hasAutoJoined) {
        const autoJoinKey = `chat_auto_joined_${accessToken.slice(-10)}`;
        
        try {
          const response = await axios.post(
            `${API_URL}api/v1/chat/auto-join-all`,
            {},
            {
              headers: {
                accesstoken: accessToken,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Auto-join result:', response.data);
          
          // Mark as auto-joined in localStorage
          localStorage.setItem(autoJoinKey, 'true');
          setHasAutoJoined(true);
        } catch (error) {
          console.error('Auto-join failed:', error);
          // Still mark as attempted to prevent infinite retries
          localStorage.setItem(autoJoinKey, 'true');
          setHasAutoJoined(true);
        }
      }
    };

    autoJoinChats();
  }, [hasAutoJoined]);

  const liveRoomsQuery = useQuery({
    queryKey: ["LiveRooms", notificationData.count], // Depend on navbar counter only; group-level uses event
    queryFn: () => {
      return axios.get(`${API_URL}api/v1/chatLiveRooms`, config).then((res) => {
        return res;
      });
    },
    staleTime: 1000 * 5, // 5 seconds stale time
    refetchInterval: 1000 * 15, // Refetch every 15 seconds (slightly less aggressive)
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
    refetchOnWindowFocus: true, // Refetch when user returns to the tab/window
    refetchOnMount: true, // Always refetch when component mounts
    enabled: true, // Always enabled - let the backend handle user state
  });

  // Force refresh when component becomes visible (user navigates back to chat)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        liveRoomsQuery.refetch();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [liveRoomsQuery]);

  // Force immediate refresh when component mounts (user navigates to chat page)
  useEffect(() => {
    // Small delay to ensure any navbar actions complete first
    const timer = setTimeout(() => {
      liveRoomsQuery.refetch();
    }, 200); // Slightly longer delay to ensure navbar actions complete
    return () => clearTimeout(timer);
  }, []); // Empty dependency array - only run on mount

  // Force refresh when notification count changes (more aggressive)
  useEffect(() => {
    if (notificationData.count > 0) {
      liveRoomsQuery.refetch();
    }
  }, [notificationData.count, liveRoomsQuery]);

  // Listen for group-seen events from the hook and refetch immediately
  useEffect(() => {
    const handler = (event) => {
      liveRoomsQuery.refetch();
    };
    window.addEventListener('ehub:group-seen', handler);
    return () => window.removeEventListener('ehub:group-seen', handler);
  }, [liveRoomsQuery]);

  return (
    <aside id="chat-selector">
      <p className="heading body-md-regular">Groups</p>
      {liveRoomsQuery.isSuccess && (
        <div className="group-list">
          {liveRoomsQuery?.data?.data?.data?.map((group) => (
            <CommunityChatGroupListGroup key={group._id} group={group} />
          ))}
        </div>
      )}
      {liveRoomsQuery.isLoading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </aside>
  );
}
