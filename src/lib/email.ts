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
              ${(data.message || '').replace(/\n/g, '<br>')}
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

/* ────────────── BOOKING EMAILS ────────────── */

interface BookingData {
  full_name: string;
  email: string;
  company: string;
  topic: string;
  scheduled_at: string;
  duration_min: number;
}

function formatBookingDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatBookingTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

/** Send booking notification to admin */
export async function sendBookingAdminNotification(data: BookingData) {
  await transporter.sendMail({
    from: `"TAMx Website" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `New Meeting Booking: ${data.full_name} — ${formatBookingDate(data.scheduled_at)}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px 40px;">
          <h1 style="margin: 0; font-size: 24px; color: #fff;">New Strategy Call Booked</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">A consultation has been scheduled via the TAMx website.</p>
        </div>
        <div style="padding: 32px 40px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${data.full_name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a;"><a href="mailto:${data.email}" style="color: #818cf8; text-decoration: none; font-size: 15px;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px; font-weight: bold;">${formatBookingDate(data.scheduled_at)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Time</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px; font-weight: bold;">${formatBookingTime(data.scheduled_at)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Duration</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e3a; color: #fff; font-size: 15px;">${data.duration_min} minutes</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Project Goals</p>
            <div style="background: #111128; padding: 20px; border-radius: 8px; border-left: 3px solid #6366f1; color: #e0e0e0; font-size: 15px; line-height: 1.6;">
              ${(data.topic || '').replace(/\n/g, '<br>') || 'Not specified'}
            </div>
          </div>
          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${data.email}?subject=Your Strategy Call with TAMx" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${data.full_name.split(' ')[0]}</a>
          </div>
        </div>
        <div style="padding: 20px 40px; background: #060612; text-align: center; color: #6b7280; font-size: 12px;">
          TAMx &mdash; AI-Powered Digital Solutions &bull; tamxai.com
        </div>
      </div>
    `,
  });
}

/** Send booking confirmation to client */
export async function sendBookingClientConfirmation(data: BookingData) {
  await transporter.sendMail({
    from: `"TAMx" <${FROM_EMAIL}>`,
    to: data.email,
    subject: `Your Strategy Call is Confirmed — ${formatBookingDate(data.scheduled_at)}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: #fff;">Call Confirmed!</h1>
          <p style="margin: 12px 0 0; color: rgba(255,255,255,0.85); font-size: 16px;">Your strategy consultation is booked, ${data.full_name.split(' ')[0]}.</p>
        </div>
        <div style="padding: 40px;">
          <div style="background: #111128; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
            <p style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px;">Meeting Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; font-size: 14px;">Date</td>
                <td style="padding: 10px 0; color: #fff; font-size: 14px; text-align: right; font-weight: bold;">${formatBookingDate(data.scheduled_at)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; font-size: 14px;">Time</td>
                <td style="padding: 10px 0; color: #fff; font-size: 14px; text-align: right; font-weight: bold;">${formatBookingTime(data.scheduled_at)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; font-size: 14px;">Duration</td>
                <td style="padding: 10px 0; color: #fff; font-size: 14px; text-align: right;">${data.duration_min} minutes</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; font-size: 14px;">Format</td>
                <td style="padding: 10px 0; color: #fff; font-size: 14px; text-align: right;">Video Call (Zoom)</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 15px; line-height: 1.7; color: #d1d5db; margin: 0 0 16px;">
            <strong style="color: #fff;">What to expect:</strong> Our lead solutions engineer will walk you through your project goals, recommend a technical architecture, and provide a timeline and cost estimation.
          </p>
          <p style="font-size: 15px; line-height: 1.7; color: #d1d5db; margin: 0 0 32px;">
            A Zoom meeting link will be sent to you before the call. If you need to reschedule, simply reply to this email.
          </p>
          <div style="text-align: center;">
            <a href="https://tamxai.com" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Visit TAMx</a>
          </div>
        </div>
        <div style="padding: 24px 40px; background: #060612; text-align: center;">
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Need to reschedule? Reply to this email or contact us at</p>
          <a href="mailto:info@tamxai.com" style="color: #818cf8; text-decoration: none; font-size: 14px;">info@tamxai.com</a>
          <p style="color: #4b5563; font-size: 11px; margin: 16px 0 0;">&copy; ${new Date().getFullYear()} TAMx. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}
