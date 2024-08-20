import sgMail from "@sendgrid/mail";

const API_KEY = process.env.API_KEY as string;
const SENDER_EMAIL = process.env.SENDER_EMAIL as string;
console.log("API_KEY", API_KEY);
sgMail.setApiKey(API_KEY);

export async function sendEmail(to: string, body: string, subject: string) {
  try {
    const email = {
      to,
      from: {
        name: "Yapier",
        email: SENDER_EMAIL,
      },
      subject,
      text: body,
      html: `<strong>${body}</strong>`,
    };
    await sgMail.send(email);
  } catch (error) {
    console.log("Error sending email : ", error);
  }
}
