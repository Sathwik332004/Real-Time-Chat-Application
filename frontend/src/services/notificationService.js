class NotificationService {
  constructor() {
    this.permission = Notification.permission;
  }

  // Request permission once
  async requestPermission() {
    if (this.permission === 'granted') return 'granted';

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    } catch (error) {
      console.error('Notification permission error:', error);
      return 'denied';
    }
  }

  // Show simple notification
  showNotification(title, message, onClick) {
    if (this.permission !== 'granted') return;

    const notification = new Notification(title, {
      body: message,
      icon: '/logo192.png', // Your app icon
    });

    if (onClick) {
      notification.onclick = () => {
        window.focus();
        onClick();
        notification.close();
      };
    }

    // Auto close after 5 seconds
    setTimeout(() => notification.close(), 5000);
  }
}

export default new NotificationService();