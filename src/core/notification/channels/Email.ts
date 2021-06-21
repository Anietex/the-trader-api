import Channel from '@/core/notification/channels/Channel';
import EmailSender from '@/core/services/EmailSender';
import EmailNotification from '@/core/notification/contracts/EmailNotification';

class Email implements Channel {
   send = async (notification: EmailNotification): Promise<any> => {
     const emailSender = new EmailSender();
     const emailData = await notification.toEmail();
     emailSender.setSubject(emailData.subject);
     emailSender.setReceiver(emailData.recipient);
     if (emailData.template) {
       return emailSender.sendHtml(emailData.template, emailData.data);
     }
     return emailSender.sendPlainTextEmail(emailData.plainText || '<-No Body->');
   }
}
export default Email;
