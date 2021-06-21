import BaseNotification from '@/core/notification/contracts/BaseNotification';
import NotificationSender from '@/core/notification/NotificationSender';

class Notification {
  static send(notification: BaseNotification) {
    const notificationSender = new NotificationSender();
    notificationSender.send(notification);
  }
}

export default Notification;
