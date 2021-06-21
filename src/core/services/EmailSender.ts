import nodemailer, { Transporter } from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

class EmailSender {
  private transporter: Transporter ;

  private receiverEmail: string = '';

  private subject: string = '';

  mailSenderEmail = process.env.MAIL_SENDER_EMAIL;

  mailSenderName = process.env.MAIL_SENDER_NAME;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '', 10),
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  setSubject(subject: string) {
    this.subject = subject;

    return this;
  }

  setReceiver(receiver: string) {
    this.receiverEmail = receiver;
    return this;
  }

  setSenderEmail(sender: string) {
    this.mailSenderEmail = sender;
    return this;
  }

  setEmailSenderName(senderName: string) {
    this.mailSenderName = senderName;
    return this;
  }

  /**
   * Sends an HTML email
   *
   */
  sendHtml(view: string, data: any, useTemplate = true) {
    // First load the email template provides by the user
    const source = fs.readFileSync(path.join(__dirname, `../../views/emails/${view}.hbs`), 'utf8');

    // Check if the user prefers to use the default email layout
    if (useTemplate) {
      const emailLayoutSource = fs.readFileSync(path.join(__dirname, '../../views/emails/layout.hbs'), 'utf8');
      Handlebars.registerPartial('layout', emailLayoutSource);
    }
    const template = Handlebars.compile(source);
    const emailHtml = template({ year: new Date().getFullYear(), ...data });

    const emailOptions = {
      from: `${this.mailSenderName} <${this.mailSenderEmail}>`,
      to: this.receiverEmail,
      subject: this.subject,
      html: emailHtml,
    };

    return new Promise((resolve, reject) => this.transporter
      .sendMail(emailOptions)
      .then((res) => {
        resolve(true);
      }).catch((e) => {
        resolve(false);
      }));
  }

  sendPlainTextEmail(text: string) {
    const emailOptions = {
      from: `${this.mailSenderName} <${this.mailSenderEmail}>`,
      to: this.receiverEmail,
      subject: this.subject,
      text,
    };

    return this.transporter
      .sendMail(emailOptions);
  }
}

export default EmailSender;
