import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.redirect(
        new URL("/en/contact?error=config", new URL(request.url).origin),
        307
      );
    }

    const resend = new Resend(apiKey);
    const formData = await request.formData();
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const company = (formData.get("company") as string) || "";
    const leadsPerMonth = (formData.get("leadsPerMonth") as string) || "";
    const message = (formData.get("message") as string) || "";
    const rawLocale = (formData.get("locale") as string) || "en";
    const locale = /^(en|fr)$/.test(rawLocale) ? rawLocale : "en";

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("CONTACT_EMAIL is not set");
      const baseUrl = new URL(request.url);
      return NextResponse.redirect(
        new URL(`/${locale}/contact?error=config`, baseUrl.origin),
        307
      );
    }

    const fromEmail =
      process.env.EMAIL_FROM || "Radianz Contact <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: [email],
      subject: `[Radianz] New demo request — ${name}`,
      html: `
        <h2>New Radianz contact request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "—"}</p>
        <p><strong>Leads desired / month:</strong> ${leadsPerMonth || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>") || "—"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      const baseUrl = new URL(request.url);
      return NextResponse.redirect(
        new URL(`/${locale}/contact?error=send`, baseUrl.origin),
        307
      );
    }

    const baseUrl = new URL(request.url);
    return NextResponse.redirect(new URL(`/${locale}/contact?success=1`, baseUrl.origin), 307);
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.redirect(
      new URL("/en/contact?error=send", new URL(request.url).origin),
      307
    );
  }
}
