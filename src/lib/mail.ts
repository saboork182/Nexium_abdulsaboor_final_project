import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendMail(to: string, link: string) {
  await transporter.sendMail({
    from: `"Login Link" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Your Magic Login Link",
    html: `<p>Click the link to login:</p><a href="${link}">${link}</a>`,
  });
}
