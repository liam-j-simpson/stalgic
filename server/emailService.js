"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
var nodemailer_1 = require("nodemailer");
var path_1 = require("path");
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'teamstalgic@gmail.com',
        pass: 'oori gjdb eydj nvuf',
    },
});
function sendEmail(to, subject, text, media) {
    if (media === void 0) { media = []; }
    var mailOptions = {
        from: '"Stalgic App" <teamstalgic@gmail.com>',
        to: to,
        subject: subject,
        text: text,
        attachments: media.map(function (item) {
            return {
                filename: path_1.default.basename(item.image_url),
                path: item.image_url,
                cid: "media-".concat(path_1.default.basename(item.image_url)),
            };
        }),
    };
    return transporter.sendMail(mailOptions);
}
// import nodemailer from 'nodemailer'
// import path from 'path'
// // Create the transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Use Gmail SMTP service
//   auth: {
//     user: 'teamstalgic@gmail.com', // Your Gmail address
//     pass: 'oori gjdb eydj nvuf', // Your app-specific password (generated in step 1)
//   },
// })
// // Function to send email
// export async function sendEmail(to, subject, text, media = []) {
//   // Create the email options, including the message and attachments (if any)
//   const mailOptions = {
//     from: '"Stalgic App" <teamstalgic@gmail.com>', // sender address
//     to, // recipient address
//     subject, // email subject
//     text, // email body
//     attachments: media.map((item) => ({
//       filename: path.basename(item.image_url), // Extract filename from URL
//       path: item.image_url, // File path or URL to the image
//       cid: item.cid || `media-${path.basename(item.image_url)}`, // Optional: for inline images
//     })),
//   }
//   try {
//     // Send the email and await the result
//     const info = await transporter.sendMail(mailOptions)
//     console.log('Message sent:', info.messageId) // Log the messageId for reference
//     return info
//   } catch (error) {
//     // Log the error if email sending fails
//     console.error('Error sending email:', error)
//     throw new Error('Failed to send email')
//   }
// }
