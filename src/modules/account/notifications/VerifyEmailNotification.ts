import EmailNotification from '@/core/notification/contracts/EmailNotification';
import { EmailData } from '@/core/notification/types';

class VerifyEmailNotification implements EmailNotification {
  private notificationData;

  constructor(notificationData: any) {
    this.notificationData = notificationData;
  }

  channels=(): Array<string> => ['email']

  toEmail =(): EmailData => ({
    subject: 'Email Verification code',
    recipient: this.notificationData.email,
    plainText: `Your email Verification code is: ${this.notificationData.verification_code}`,
    data: {
      verification_code: this.notificationData.verification_code,
    },
  })
}

export default VerifyEmailNotification;
