// hooks/useListenMessages.js
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
import notificationService from '../services/notificationService';
import windowFocus from '../utils/windowFocus';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      // Play sound (your existing code)
      const sound = new Audio(notificationSound);
      sound.play();

      // Show browser notification only if window is not focused
      if (!windowFocus.isFocused()) {
        notificationService.showNotification(
          `New message from ${newMessage.senderName || 'Someone'}`,
          newMessage.message,
          () => {
            // Focus on conversation when notification is clicked
            if (selectedConversation) {
              // Optional: scroll to conversation or any other action
            }
          }
        );
      }

      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages, selectedConversation]);
};

export default useListenMessages;