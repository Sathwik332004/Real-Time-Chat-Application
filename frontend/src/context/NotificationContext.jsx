import React, { createContext, useContext, useState, useEffect } from 'react';
import notificationService from '../services/notificationService';
import { useAuthContext } from './AuthContext';
import { useSocketContext } from './SocketContext';

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationContextProvider');
  }
  return context;
};

export const NotificationContextProvider = ({ children }) => {
  const [notificationPermission, setNotificationPermission] = useState(notificationService.getPermission());
  const [notificationSettings, setNotificationSettings] = useState({
    global: {
      enabled: true,
      soundEnabled: true,
      desktopNotifications: true,
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00',
      },
    },
    conversations: {},
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();

  // Handle window focus/blur events
  useEffect(() => {
    const handleFocus = () => {
      setIsWindowFocused(true);
      if (socket) {
        socket.emit('windowFocus', {
          isWindowFocused: true,
          activeConversationId,
        });
      }
    };

    const handleBlur = () => {
      setIsWindowFocused(false);
      if (socket) {
        socket.emit('windowFocus', {
          isWindowFocused: false,
          activeConversationId,
        });
      }
    };

    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsWindowFocused(isVisible);
      if (socket) {
        socket.emit('windowFocus', {
          isWindowFocused: isVisible,
          activeConversationId,
        });
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial focus state
    setIsWindowFocused(document.hasFocus());

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [socket, activeConversationId]);

  // Listen for notifications from socket
  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notificationData) => {
      const { sender, message, shouldShowDesktop, shouldPlaySound } = notificationData;

      // Play sound if enabled
      if (shouldPlaySound && notificationSettings.global.soundEnabled) {
        notificationService.playNotificationSound();
      }

      // Show desktop notification if enabled and conditions are met
      if (shouldShowDesktop && notificationSettings.global.desktopNotifications) {
        notificationService.showMessageNotification(
          sender.fullName,
          message,
          notificationData.conversationId,
          sender.profilePic
        );
      }

      // Update unread count
      setUnreadCount(prev => prev + 1);
    };

    socket.on('notification', handleNotification);

    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket, notificationSettings]);

  // Load notification preferences
  useEffect(() => {
    if (!authUser) return;

    const loadNotificationPreferences = async () => {
      try {
        const response = await fetch('/api/notifications/preferences', {
          headers: {
            'Authorization': `Bearer ${authUser.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotificationSettings({
            global: data.globalSettings,
            conversations: data.conversationSettings.reduce((acc, pref) => {
              acc[pref.conversationId._id] = pref;
              return acc;
            }, {}),
          });
        }
      } catch (error) {
        console.error('Error loading notification preferences:', error);
      }
    };

    loadNotificationPreferences();
  }, [authUser]);

  // Request notification permission
  const requestNotificationPermission = async () => {
    try {
      const permission = await notificationService.requestPermission();
      setNotificationPermission(permission);
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    }
  };

  // Update global notification settings
  const updateGlobalSettings = async (newSettings) => {
    try {
      const response = await fetch('/api/notifications/preferences/global', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`,
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(prev => ({
          ...prev,
          global: data.preferences,
        }));
        return data.preferences;
      }
      throw new Error('Failed to update global settings');
    } catch (error) {
      console.error('Error updating global settings:', error);
      throw error;
    }
  };

  // Update conversation-specific settings
  const updateConversationSettings = async (conversationId, newSettings) => {
    try {
      const response = await fetch(`/api/notifications/preferences/conversation/${conversationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`,
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(prev => ({
          ...prev,
          conversations: {
            ...prev.conversations,
            [conversationId]: data.preferences,
          },
        }));
        return data.preferences;
      }
      throw new Error('Failed to update conversation settings');
    } catch (error) {
      console.error('Error updating conversation settings:', error);
      throw error;
    }
  };

  // Mute conversation
  const muteConversation = async (conversationId, duration = null) => {
    try {
      const response = await fetch(`/api/notifications/mute/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ duration }),
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(prev => ({
          ...prev,
          conversations: {
            ...prev.conversations,
            [conversationId]: data.preferences,
          },
        }));
        return data.preferences;
      }
      throw new Error('Failed to mute conversation');
    } catch (error) {
      console.error('Error muting conversation:', error);
      throw error;
    }
  };

  // Unmute conversation
  const unmuteConversation = async (conversationId) => {
    try {
      const response = await fetch(`/api/notifications/unmute/${conversationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authUser.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(prev => ({
          ...prev,
          conversations: {
            ...prev.conversations,
            [conversationId]: data.preferences,
          },
        }));
        return data.preferences;
      }
      throw new Error('Failed to unmute conversation');
    } catch (error) {
      console.error('Error unmuting conversation:', error);
      throw error;
    }
  };

  // Set active conversation
  const setActiveConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    if (socket) {
      socket.emit('activeConversationChange', conversationId);
    }

    // Clear unread count when opening a conversation
    if (conversationId) {
      setUnreadCount(0);
    }
  };

  const value = {
    notificationPermission,
    notificationSettings,
    unreadCount,
    isWindowFocused,
    activeConversationId,
    requestNotificationPermission,
    updateGlobalSettings,
    updateConversationSettings,
    muteConversation,
    unmuteConversation,
    setActiveConversation,
    setUnreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};