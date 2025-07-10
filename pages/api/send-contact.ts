import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    name, email, phone, service, message, company, budget, timeline, priority, platforms, features, technicalRequirements, source, contactMethod
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: (process.env.MAIL_PORT === '465'),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'info@digitroncx.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>Contact Form Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Company:</b> ${company}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Budget:</b> ${budget}</p>
      <p><b>Timeline:</b> ${timeline}</p>
      <p><b>Priority:</b> ${priority}</p>
      <p><b>Platforms:</b> ${platforms && platforms.length ? platforms.join(', ') : 'None'}</p>
      <p><b>Features:</b> ${features && features.length ? features.join(', ') : 'None'}</p>
      <p><b>Technical Requirements:</b> ${technicalRequirements}</p>
      <p><b>Source:</b> ${source}</p>
      <p><b>Preferred Contact Method:</b> ${contactMethod}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
} 