import BaseNotification from '@/core/notification/contracts/BaseNotification';

interface Channel{
   send(notification: BaseNotification): void
}

export default Channel;
