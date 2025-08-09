import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name, email, phone, company, website_type, industry, pages,
      features, socialmedia, domain, timeline, files
    } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields: name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email configuration is available
    if (!process.env.DEMO_MAIL_HOST || !process.env.DEMO_MAIL_USER || !process.env.DEMO_MAIL_PASS) {
      console.warn('Email configuration missing, skipping email notification');
      return res.status(200).json({ 
        success: true, 
        message: 'Demo form submitted successfully (email notification skipped due to missing configuration)' 
      });
    }

    // Use environment variables for SMTP config
    const transporter = nodemailer.createTransport({
      host: process.env.DEMO_MAIL_HOST, // e.g. smtp.digitroncx.com
      port: Number(process.env.DEMO_MAIL_PORT) || 465, // default to 465 if not set
      secure: (process.env.DEMO_MAIL_PORT === '465'), // true for 465, false for 587
      auth: {
        user: process.env.DEMO_MAIL_USER,
        pass: process.env.DEMO_MAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.DEMO_MAIL_USER,
      to: process.env.DEMO_MAIL_USER, // or any other email you want to receive at
      subject: 'New Demo Form Submission',
      html: `
        <h2>Demo Form Submission Details</h2>
        <br>
        <br>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Company:</b> ${company || 'Not provided'}</p>
        <p><b>Website Type:</b> ${website_type || 'Not specified'}</p>
        <p><b>Industry:</b> ${industry || 'Not specified'}</p>
        <p><b>Pages:</b> ${pages || 'Not specified'}</p>
        <p><b>Features:</b> ${features && features.length ? features.join(', ') : 'None'}</p>
        <p><b>Social Media:</b> ${socialmedia || 'Not specified'}</p>
        <p><b>Domain:</b> ${domain || 'Not specified'}</p>
        <p><b>Timeline:</b> ${timeline || 'Not specified'}</p>
        <p><b>Files:</b> ${files && files.length ? files.map((url: string) => `<a href="${url}">${url}</a>`).join('<br/>') : 'None'}</p>
        <br>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    }

    await transporter.sendMail(mailOptions)
    
    res.status(200).json({ 
      success: true, 
      message: 'Email notification sent successfully' 
    })
  } catch (error) {
    console.error('Error in send-email API:', error);
    
    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    res.status(500).json({ 
      error: 'Failed to process demo form submission',
      details: errorMessage,
      timestamp: new Date().toISOString()
    })
  }
} 