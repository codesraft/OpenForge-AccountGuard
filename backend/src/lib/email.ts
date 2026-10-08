import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    return await resend.emails.send({
        from: process.env.EMAIL_FROM || "Auth Kit <onboarding@resend.dev>",
        to,
        subject,
        html,
    });
}

