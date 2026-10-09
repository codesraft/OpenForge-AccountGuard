import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    return await resend.emails.send({
        from: process.env.EMAIL_FROM || "Auth Kit <onboarding@resend.dev>",
        to,
        subject,
        html,
    });
}

// ============================================================
// Branded Email Templates
// ============================================================

export function verificationEmailTemplate(url: string, name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Auth Lifecycle Kit</h1>
              <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Secure Authentication Framework</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="color:#f4f4f5;margin:0 0 12px;font-size:20px;">Verify your email address</h2>
              <p style="color:#a1a1aa;font-size:15px;line-height:1.6;margin:0 0 24px;">Hi ${name}, thanks for signing up! Click the button below to verify your email address and activate your account.</p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:600;font-size:15px;">Verify Email Address</a>
              </div>
              <p style="color:#71717a;font-size:13px;line-height:1.6;margin:0;">This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="color:#52525b;font-size:12px;margin:0;">If the button doesn't work, copy this link:<br>
              <a href="${url}" style="color:#6366f1;word-break:break-all;">${url}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function passwordResetEmailTemplate(url: string, name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ef4444,#f97316);padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Password Reset</h1>
              <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Auth Lifecycle Kit</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="color:#f4f4f5;margin:0 0 12px;font-size:20px;">Reset your password</h2>
              <p style="color:#a1a1aa;font-size:15px;line-height:1.6;margin:0 0 24px;">Hi ${name}, we received a request to reset your password. Click the button below to create a new password.</p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#ef4444,#f97316);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:600;font-size:15px;">Reset Password</a>
              </div>
              <div style="background:#292524;border:1px solid #44403c;border-radius:8px;padding:16px;margin:24px 0;">
                <p style="color:#fbbf24;font-size:13px;margin:0;"><strong>⚠ Security notice:</strong> This link expires in 1 hour. If you didn't request a password reset, please secure your account immediately.</p>
              </div>
              <p style="color:#71717a;font-size:13px;line-height:1.6;margin:0;">If you didn't request this, you can safely ignore this email. Your password will not change.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="color:#52525b;font-size:12px;margin:0;">If the button doesn't work, copy this link:<br>
              <a href="${url}" style="color:#ef4444;word-break:break-all;">${url}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
