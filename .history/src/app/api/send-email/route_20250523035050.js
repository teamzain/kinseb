// pages/api/send-email.js (for Pages Router)
// OR app/api/send-email/route.js (for App Router)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, companyName, contactNumber, message } = req.body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required' });
    }

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #0D98BA; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Contact Information</h3>
            
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Full Name:</strong>
              <span style="color: #333;">${fullName}</span>
            </div>
            
            ${email ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Email:</strong>
              <span style="color: #333;">${email}</span>
            </div>
            ` : ''}
            
            ${companyName ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Company:</strong>
              <span style="color: #333;">${companyName}</span>
            </div>
            ` : ''}
            
            ${contactNumber ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Contact Number:</strong>
              <span style="color: #333;">${contactNumber}</span>
            </div>
            ` : ''}
          </div>
          
          ${message ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Message</h3>
            <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <p style="margin: 0;">This message was sent from the Pixnesh contact form.</p>
            <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'contact@pixnesh.com', // Replace with your verified domain
      to: ['hello@pixnesh.com'], // Replace with your receiving email
      subject: `New Contact Form Submission from ${fullName}`,
      html: emailContent,
      replyTo: email || 'noreply@pixnesh.com',
    });

    console.log('Email sent successfully:', emailData);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: emailData.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// For App Router (app/api/send-email/route.js), use this instead:
/*
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, companyName, contactNumber, message } = body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    // Create email content (same as above)
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #0D98BA; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Contact Information</h3>
            
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Full Name:</strong>
              <span style="color: #333;">${fullName}</span>
            </div>
            
            ${email ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Email:</strong>
              <span style="color: #333;">${email}</span>
            </div>
            ` : ''}
            
            ${companyName ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Company:</strong>
              <span style="color: #333;">${companyName}</span>
            </div>
            ` : ''}
            
            ${contactNumber ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #555; display: inline-block; width: 140px;">Contact Number:</strong>
              <span style="color: #333;">${contactNumber}</span>
            </div>
            ` : ''}
          </div>
          
          ${message ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Message</h3>
            <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <p style="margin: 0;">This message was sent from the Pixnesh contact form.</p>
            <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'contact@pixnesh.com', // Replace with your verified domain
      to: ['hello@pixnesh.com'], // Replace with your receiving email
      subject: `New Contact Form Submission from ${fullName}`,
      html: emailContent,
      replyTo: email || 'noreply@pixnesh.com',
    });

    console.log('Email sent successfully:', emailData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: emailData.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
*/