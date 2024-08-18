import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string) {
  await transport.sendMail({
    from: process.env.SENDER_EMAIL,
    sender: process.env.SENDER_EMAIL,
    to,
    subject: "Hello from Yapier!",
    text: body,
  });
}
