import { Resend } from 'resend';
import { NextResponse } from 'next/server';

/**
 * Initialize Resend with API Key from environment variables.
 * Do not expose this key to the client.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields (name, email, message).' },
        { status: 400 }
      );
    }

    // Attempt to send email
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // This is the default Resend test sender. Replace with your verified domain in production.
      to: 'iktushar01@gmail.com', // MUST be your Resend account email for testing unless you verify a domain.
      subject: `🚀 Portfolio Contact: ${name}`,
      replyTo: email, // Allows you to reply directly to the sender
      html: `
        <div style="background-color: #f0f0f0; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 5px solid #1a1a1a; border-radius: 20px; box-shadow: 10px 10px 0px #1a1a1a; overflow: hidden;">
            <div style="background-color: #7c3aed; padding: 20px; border-bottom: 5px solid #1a1a1a; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
                Incoming <span style="color: #fbbf24;">Transmission!</span>
              </h1>
            </div>
            
            <div style="padding: 30px;">
              <div style="margin-bottom: 25px;">
                <span style="background-color: #fbbf24; border: 3px solid #1a1a1a; padding: 5px 12px; border-radius: 8px; font-weight: 900; font-size: 12px; text-transform: uppercase; display: inline-block; margin-bottom: 8px;">
                  SENDER IDENTITY
                </span>
                <div style="font-size: 20px; font-weight: 800; color: #1a1a1a;">
                  ${name}
                </div>
              </div>

              <div style="margin-bottom: 25px;">
                <span style="background-color: #22c55e; border: 3px solid #1a1a1a; padding: 5px 12px; border-radius: 8px; font-weight: 900; font-size: 12px; text-transform: uppercase; display: inline-block; margin-bottom: 8px; color: white;">
                  DIGITAL ADDRESS
                </span>
                <div style="font-size: 18px; font-weight: 700; color: #4b5563;">
                  ${email}
                </div>
              </div>

              <div style="background-color: #f3f4f6; border: 4px border-style: dashed; border-color: #d1d5db; padding: 20px; border-radius: 15px;">
                <span style="font-weight: 900; font-size: 14px; text-transform: uppercase; color: #6b7280; display: block; margin-bottom: 10px;">
                  THE MESSAGE
                </span>
                <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; font-weight: 600; margin: 0; white-space: pre-wrap;">
                  ${message}
                </p>
              </div>
            </div>

            <div style="background-color: #1a1a1a; padding: 15px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                Sent via iktushar01.me • Portfolio OS
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error: any) {
    console.error('Resend API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
