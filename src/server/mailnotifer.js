const nodemailer = require('nodemailer');


function sendMail(recipientAdress, subject, body){
  const nodemailer = require('nodemailer');

const smtpConfig = {
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  auth: {
    user: 'smtpdevserver@gmail.com',
    pass: '@Superpass',
  }
};

const transporter = nodemailer.createTransport(smtpConfig);
const mailOptions = {
  from: '"Super Nice Shop"<smtpdevserver@gmail.com>',
  to: recipientAdress,
  subject: subject,
  text: body,
  html: body
};

transporter.sendMail(mailOptions, (err,info)=>{
  if(err)
    console.log('mail not delivered')
})
}

module.exports.sendMail = sendMail