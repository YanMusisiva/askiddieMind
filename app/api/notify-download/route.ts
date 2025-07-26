// /app/api/notify-download/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { filename, email = "anonyme" } = data;

  const transporter = nodemailer.createTransport({
    service: "gmail", // ou autre service SMTP
    auth: {
      user: process.env.SMTP_USER, // Ton email
      pass: process.env.SMTP_PASS, // Ton mot de passe d'application
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `📚 Un ebook gratuit a été téléchargé`,
    text: `Un utilisateur a téléchargé l'ebook gratuit : ${filename}\nEmail : ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json({ success: false, error });
  }
}
