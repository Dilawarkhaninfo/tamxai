import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_USER || 'info@tamxai.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@tamxai.com';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  service: string;
  budget: string;
  message: string;
}

/** Send notification email to admin about new contact submission */
export async function sendAdminNotification(data: ContactData) {
  const fullName = `${data.firstName} ${data.lastName}`;
  const phoneDisplay = data.phone ? `${data.countryCode} ${data.phone}` : 'Not provided';

  await transporter.sendMail({
    from: `"TAMx Website" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `New Inquiry from ${fullName}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px 40px;">
          <h1 style="margin: 0; font-size: 24px; color: #fff;">New Contact Submission</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">A new inquiry has been received from the TAMx website.</p>
        </div>
        <div style="padding: 32px 40px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a;"><a href="mailto:${data.email}" style="color: #818cf8; text-decoration: none; font-size: 15px;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${phoneDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${data.service || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${data.budget || 'Not specified'}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
            <div style="background: #111128; padding: 20px; border-radius: 8px; border-left: 3px solid #6366f1; color: #e0e0e0; font-size: 15px; line-height: 1.6;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${data.email}?subject=Re: Your Inquiry at TAMx" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${data.firstName}</a>
          </div>
        </div>
        <div style="padding: 20px 40px; background: #060612; text-align: center; color: #6b7280; font-size: 12px;">
          TAMx &mdash; AI-Powered Digital Solutions &bull; tamxai.com
        </div>
      </div>
    `,
  });
}

/** Send confirmation email to the client */
export async function sendClientConfirmation(data: ContactData) {
  await transporter.sendMail({
    from: `"TAMx" <${FROM_EMAIL}>`,
    to: data.email,
    subject: `Thank you for reaching out, ${data.firstName}!`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: #fff;">Thank You, ${data.firstName}!</h1>
          <p style="margin: 12px 0 0; color: rgba(255,255,255,0.85); font-size: 16px;">We've received your inquiry and we're on it.</p>
        </div>
        <div style="padding: 40px;">
          <p style="font-size: 16px; line-height: 1.7; color: #d1d5db; margin: 0 0 24px;">
            Our team has received your message and will review it promptly. You can expect to hear from us within <strong style="color: #fff;">4 business hours</strong> for high-priority inquiries.
          </p>
          <div style="background: #111128; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
            <p style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Your Submission Summary</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Service Interest</td>
                <td style="padding: 8px 0; color: #fff; font-size: 14px; text-align: right;">${data.service || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Project Scale</td>
                <td style="padding: 8px 0; color: #fff; font-size: 14px; text-align: right;">${data.budget || 'To be discussed'}</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 15px; line-height: 1.7; color: #d1d5db; margin: 0 0 32px;">
            In the meantime, feel free to explore our <a href="https://tamxai.com/services" style="color: #818cf8; text-decoration: none;">services</a> or check out our latest <a href="https://tamxai.com/blog" style="color: #818cf8; text-decoration: none;">blog posts</a>.
          </p>
          <div style="text-align: center;">
            <a href="https://tamxai.com" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Visit TAMx</a>
          </div>
        </div>
        <div style="padding: 24px 40px; background: #060612; text-align: center;">
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Need immediate assistance? Reach us at</p>
          <a href="mailto:info@tamxai.com" style="color: #818cf8; text-decoration: none; font-size: 14px;">info@tamxai.com</a>
          <span style="color: #4b5563; margin: 0 8px;">|</span>
          <a href="tel:+923353898844" style="color: #818cf8; text-decoration: none; font-size: 14px;">+92 335 389 8844</a>
          <p style="color: #4b5563; font-size: 11px; margin: 16px 0 0;">&copy; ${new Date().getFullYear()} TAMx. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}
