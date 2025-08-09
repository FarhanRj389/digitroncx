import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name, email, phone, company, partnership_type, industry, 
      experience, resources, goals, timeline, message
    } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email configuration is available
    if (!process.env.CONTACT_MAIL_HOST || !process.env.CONTACT_MAIL_USER || !process.env.CONTACT_MAIL_PASS) {
      console.warn('Email configuration missing, skipping email notification');
      return res.status(200).json({ 
        success: true, 
        message: 'Partnership form submitted successfully (email notification skipped due to missing configuration)' 
      });
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.CONTACT_MAIL_HOST,
      port: Number(process.env.CONTACT_MAIL_PORT) || 587,
      secure: (process.env.CONTACT_MAIL_PORT === '465'),
      auth: {
        user: process.env.CONTACT_MAIL_USER,
        pass: process.env.CONTACT_MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.CONTACT_MAIL_USER,
      to: 'info@digitroncx.com',
      subject: 'New Partnership Form Submission',
      html: `
        <h2>Partnership Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Company:</b> ${company || 'Not provided'}</p>
        <p><b>Partnership Type:</b> ${partnership_type || 'Not specified'}</p>
        <p><b>Industry:</b> ${industry || 'Not specified'}</p>
        <p><b>Experience:</b> ${experience || 'Not specified'}</p>
        <p><b>Resources:</b> ${resources || 'Not specified'}</p>
        <p><b>Goals:</b> ${goals || 'Not specified'}</p>
        <p><b>Timeline:</b> ${timeline || 'Not specified'}</p>
        <p><b>Message:</b> ${message}</p>
        <br>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Partnership form submitted successfully' 
    });
  } catch (error) {
    console.error('Error in send-partnership API:', error);
    
    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    res.status(500).json({ 
      error: 'Failed to process partnership form submission',
      details: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}
