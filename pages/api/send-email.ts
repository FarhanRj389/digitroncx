import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    name, email, phone, company, website_type, industry, pages,
    features,  socialmedia, domain, timeline, files
  } = req.body

  // Use environment variables for SMTP config
  const transporter = nodemailer.createTransport({
    host: process.env.DEMO_MAIL_HOST, // e.g. smtp.digitroncx.com
    port: Number(process.env.DEMO_MAIL_PORT) || 465, // default to 587 if not set
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
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Company:</b> ${company}</p>
      <p><b>Website Type:</b> ${website_type}</p>
      <p><b>Industry:</b> ${industry}</p>
      <p><b>Pages:</b> ${pages}</p>
      <p><b>Features:</b> ${features}</p>
      <p><b>Social Media:</b> ${socialmedia}</p>
      <p><b>Domain:</b> ${domain}</p>
      <p><b>Timeline:</b> ${timeline}</p>
      <p><b>Files:</b> ${files && files.length ? files.map((url: string) => `<a href="${url}">${url}</a>`).join('<br/>') : 'None'}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
} 