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
  const mailOptions = {
    from: '"Stalgic App" <teamstalgic@gmail.com>',
    to,
    subject,
    html: htmlformat,
    attachments: media
      .map((item) => {
        const filePath = path.resolve('public', 'stalgic.png')

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
      .filter(Boolean),
  }

  return transporter.sendMail(mailOptions)
}
