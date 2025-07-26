import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, course, motif } = await req.json();

  // Vérification de l'email simple
  if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
    return new Response(JSON.stringify({ error: "Email invalide." }), {
      status: 400,
    });
  }

  // Configuration du transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"MiniMind Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // L'email de l'administrateur
      subject: "📩 Nouvelle demande de contact depuis le site",
      text: `Une nouvelle demande a été soumise :

Motif : ${motif}
Cours concerné : ${course}
Email de l'utilisateur : ${email}
`,
      html: `
        <div style="font-family:sans-serif;padding:24px;font-size:16px;line-height:1.5;">
          <h2>📩 Nouvelle demande de contact</h2>
          <p><b>Motif :</b> ${motif}</p>
          <p><b>Cours concerné :</b> ${course}</p>
          <p><b>Email de l'utilisateur :</b> <a href="mailto:${email}">${email}</a></p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi de l'email." }),
      { status: 500 }
    );
  }
}
