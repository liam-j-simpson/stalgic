import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teamstalgic@gmail.com',
    pass: 'oori gjdb eydj nvuf',
  },
})

export function sendEmail(to, subject, htmlformat, media = []) {
  const capsuleImgs = media
    .map((item) => {
      const filePath = path.resolve('public', 'uploads', item.filename)

      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`)
        return null
      }

      return {
        filename: item.filename,
        path: filePath,
        cid: `media-${item.filename}`,
      }
    })
    .filter(Boolean)

  const mailOptions = {
    from: '"Stalgic App" <teamstalgic@gmail.com>',
    to,
    subject,
    html: htmlformat,
    attachments: [
      ...capsuleImgs,
      {
        filename: 'stalgic.png',
        path: path.resolve('public', 'Stalgic_Logo3.png'),
        cid: 'logo',
      },
    ],
  }

  return transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log('Email sent successfully')
    })
    .catch((error) => {
      console.error('Error sending email:', error)
    })
}
