import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string, subject: string) {
  await transport.sendMail({
    from: process.env.SENDER_EMAIL,
    sender: process.env.SENDER_EMAIL,
    to,
    subject: subject,
    text: body,
  });
}
