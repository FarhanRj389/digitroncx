import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    name, email, phone, service, message, company, budget, timeline, priority, platforms, features, technicalRequirements, source, contactMethod
  } = req.body;

  // Insert into Supabase database
  const { error: dbError } = await supabase
    .from('contacts')
    .insert([{
      name,
      email,
      phone,
      service,
      message,
      company,
      budget,
      timeline,
      priority,
      platforms: Array.isArray(platforms) ? platforms.join(',') : platforms,
      features: Array.isArray(features) ? features.join(',') : features,
      technical_requirements: technicalRequirements,
      source,
      contact_method: contactMethod,
    }]);

  if (dbError) {
    return res.status(500).json({ error: 'Database error: ' + dbError.message });
  }

  const transporter = nodemailer.createTransport({
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
    subject: 'New Project Query Form Submission',
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