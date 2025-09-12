import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../services/APIUtils';
import { getAccessToken } from '../features/getCookieValues';

const useChatNotifications = () => {
  const [notificationData, setNotificationData] = useState({
    count: 0,
    type: 'unread', // 'unread' or 'daily'
    isLoggedIn: false,
    loading: true,
    error: null
  });
  // Note: Do not use internal state to notify other components about group-level
  // refreshes. Different hook instances don't share state. We'll use a
  // CustomEvent on window instead so any listener (like the group list) can
  // react immediately.

  const fetchNotificationData = useCallback(async () => {
    try {
      setNotificationData(prev => ({ ...prev, loading: true, error: null }));

      // Get access token using the same method as other parts of the app
      const accessToken = getAccessToken();

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add token if available
      if (accessToken) {
        headers.accesstoken = accessToken;
      }

      // Ensure no double slashes in URL
      const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
      const response = await fetch(`${baseURL}/api/v1/community-notification`, {
        method: 'GET',
        headers: headers
      });

      const data = await response.json();

      if (data.success) {
        setNotificationData({
          count: data.data.notificationCount || 0,
          type: data.data.type || 'daily',
          isLoggedIn: data.data.isLoggedIn || false,
          loading: false,
          error: null
        });
      } else {
        throw new Error(data.message || 'Failed to fetch notification data');
      }
    } catch (error) {
      console.error('Error fetching chat notifications:', error);
      setNotificationData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchNotificationData();
  }, [fetchNotificationData]);

  // Set up polling for real-time updates (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(fetchNotificationData, 30000);
    return () => clearInterval(interval);
  }, [fetchNotificationData]);

  // Function to manually refresh notifications
  const refreshNotifications = useCallback(() => {
    fetchNotificationData();
  }, [fetchNotificationData]);

  // Function to mark all chats as seen (reset notification count to 0)
  const markAllChatsAsSeen = useCallback(async () => {
    if (!notificationData.isLoggedIn) return; // Only for logged-in users

    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
      await fetch(`${baseURL}/api/v1/mark-all-seen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accesstoken': accessToken
        }
      });

      // Refresh notification count after marking all as seen
      setTimeout(fetchNotificationData, 500);
    } catch (error) {
      console.error('Error marking all chats as seen:', error);
    }
  }, [notificationData.isLoggedIn, fetchNotificationData]);

  // Function to clear navbar badge only (acknowledge without affecting individual groups)
  const clearNavbarBadge = useCallback(async () => {
    if (!notificationData.isLoggedIn) return; // Only for logged-in users

    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
      await fetch(`${baseURL}/api/v1/acknowledge-navbar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accesstoken': accessToken
        }
      });

      // Refresh notification count after clearing navbar badge
      setTimeout(fetchNotificationData, 500);
    } catch (error) {
      console.error('Error clearing navbar badge:', error);
    }
  }, [notificationData.isLoggedIn, fetchNotificationData]);

  // Function to clear notifications (when user enters chat)
  const clearNotifications = useCallback(async (chatId) => {
    if (!notificationData.isLoggedIn) return; // Only for logged-in users

    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
      const response = await fetch(`${baseURL}/api/v1/update-last-seen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accesstoken': accessToken
        },
        body: JSON.stringify({ chatId })
      });

      if (response.ok) {
        // Notify any listeners (e.g., group list) to refetch unread counts now
        try {
          window.dispatchEvent(new CustomEvent('ehub:group-seen', { detail: { chatId } }));
        } catch (e) {
          console.error('Error dispatching group-seen event:', e);
        }
        
        // Refresh notification count after marking as seen
        setTimeout(fetchNotificationData, 500);
      } else {
        console.error('Failed to update last seen:', response.status);
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  }, [notificationData.isLoggedIn, fetchNotificationData]);

  return {
    notificationData,
    refreshNotifications,
    clearNotifications,
    markAllChatsAsSeen,
    clearNavbarBadge
  };
};

export default useChatNotifications;
