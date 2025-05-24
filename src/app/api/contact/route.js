import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, companyName, contactNumber, message } = body;

    console.log('Received form data:', { fullName, email, companyName, contactNumber, message: message.substring(0, 50) + '...' });

    // Validate required fields
    if (!fullName || !email || !message) {
      console.log('Validation failed: missing required fields');
      return new Response(
        JSON.stringify({ error: 'Full name, email, and message are required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email format');
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('Environment variables missing:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_APP_PASSWORD: !!process.env.EMAIL_APP_PASSWORD
      });
      return new Response(
        JSON.stringify({ error: 'Server configuration error. Please contact support.' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Creating nodemailer transporter...');

    // Create transporter - FIXED: use createTransport not createTransporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter
    try {
      console.log('Verifying email connection...');
      await transporter.verify();
      console.log('Email connection verified successfully');
    } catch (verifyError) {
      console.error('Email verification failed:', verifyError);
      return new Response(
        JSON.stringify({ 
          error: 'Email service configuration error. Please check your credentials.' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Preparing emails...');

    // Email to business owner
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D98BA; border-bottom: 2px solid #0D98BA; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Full Name:</td>
                <td style="padding: 8px 0; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #0D98BA; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${companyName ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
                <td style="padding: 8px 0; color: #333;">${companyName}</td>
              </tr>
              ` : ''}
              ${contactNumber ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="tel:${contactNumber}" style="color: #0D98BA; text-decoration: none;">${contactNumber}</a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0D98BA;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="color: #555; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #2d5a2d; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              • Reply to: <a href="mailto:${email}" style="color: #0D98BA;">${email}</a><br>
              ${contactNumber ? `• Call: <a href="tel:${contactNumber}" style="color: #0D98BA;">${contactNumber}</a><br>` : ''}
              • Submitted: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply to customer
    const autoReply = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Kinseb Web Development - We\'ll be in touch soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #0D98BA, #04091D); color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You, ${fullName}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 0;">
              Thank you for reaching out to <strong>Kinseb Web Development</strong>! We're excited to learn about your project and how we can help turn your ideas into impactful digital products.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0D98BA;">
              <h3 style="color: #0D98BA; margin-top: 0;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
                <li>Our team will review your message within 24 hours</li>
                <li>We'll get back to you with next steps and any questions</li>
                <li>If needed, we'll schedule a discovery call to discuss your project in detail</li>
              </ul>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #2d5a2d; margin-top: 0;">Your Message Summary:</h4>
              <p style="color: #555; margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
              <p style="color: #555; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${companyName ? `<p style="color: #555; margin: 5px 0;"><strong>Company:</strong> ${companyName}</p>` : ''}
              ${contactNumber ? `<p style="color: #555; margin: 5px 0;"><strong>Phone:</strong> ${contactNumber}</p>` : ''}
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                Have urgent questions? Feel free to reach out directly:
              </p>
              <p style="margin: 5px 0;">
                <a href="mailto:hello@Kinseb Web Development.com" style="color: #0D98BA; text-decoration: none; font-weight: bold;">hello@Kinseb Web Development.com</a>
              </p>
              <p style="margin: 5px 0;">
                <a href="tel:+1234567890" style="color: #0D98BA; text-decoration: none; font-weight: bold;">+123 456 7890</a>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    console.log('Sending email to owner...');
    await transporter.sendMail(mailToOwner);
    console.log('Owner email sent successfully');

    console.log('Sending auto-reply to customer...');
    await transporter.sendMail(autoReply);
    console.log('Auto-reply sent successfully');

    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // More specific error handling
    if (error.code === 'EAUTH') {
      return new Response(
        JSON.stringify({ error: 'Email authentication failed. Please check your Gmail app password.' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    if (error.code === 'ENOTFOUND') {
      return new Response(
        JSON.stringify({ error: 'Network error. Please check your internet connection.' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (error.message && error.message.includes('Invalid login')) {
      return new Response(
        JSON.stringify({ error: 'Gmail authentication failed. Please verify your email and app password.' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}