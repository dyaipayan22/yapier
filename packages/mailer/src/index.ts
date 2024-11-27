import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.API_KEY as string);

export async function sendEmail(to: string, body: string, subject: string) {
  try {
    const email = {
      to,
      from: {
        name: "Yapier",
        email: process.env.SENDER_EMAIL as string,
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
