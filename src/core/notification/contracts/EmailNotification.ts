import BaseNotification from '@/core/notification/contracts/BaseNotification';
import { EmailData } from '@/core/notification/types';

interface EmailNotification extends BaseNotification{
  toEmail(): Promise<EmailData> | EmailData
}
export default EmailNotification;
