import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.redirect(
        new URL("/contact?error=config", request.url),
        307
      );
    }

    const resend = new Resend(apiKey);
    const formData = await request.formData();
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const company = (formData.get("company") as string) || "";
    const message = (formData.get("message") as string) || "";

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("CONTACT_EMAIL is not set");
      return NextResponse.redirect(
        new URL("/contact?error=config", request.url),
        307
      );
    }

    const fromEmail =
      process.env.EMAIL_FROM || "Radianz Contact <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: [email],
      subject: `[Radianz] Nouvelle demande de démo — ${name}`,
      html: `
        <h2>Nouvelle demande de contact Radianz</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Société:</strong> ${company || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>") || "—"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.redirect(
        new URL("/contact?error=send", request.url),
        307
      );
    }

    return NextResponse.redirect(new URL("/contact?success=1", request.url), 307);
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.redirect(
      new URL("/contact?error=send", request.url),
      307
    );
  }
}
