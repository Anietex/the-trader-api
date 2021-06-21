import BaseNotification from '@/core/notification/contracts/BaseNotification';
import NotificationSender from '@/core/notification/NotificationSender';

class Notification {
  static async send(notification: BaseNotification) {
    const notificationSender = new NotificationSender();
    await notificationSender.send(notification);
  }
}

export default Notification;
