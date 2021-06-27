import { User } from '../entity/User'
import { getManager } from 'typeorm'
import * as nodemailer from 'nodemailer'

export const verifyUser = async (id: string) => {
  const entityManager = getManager()
  console.log('updating user.verified to be true')
  return await entityManager.update(User, id, { verified: true })
}

export const sendVerificationEmail = async (verifyCode, email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  } as any)

  let message = {
    from: 'volleyballtournamentapp@gmail.com',
    to: `${email}`,
    subject: 'Complete registration to be apart of your team!',
    text: 'Plaintext version of the message',
    // build url with verifycode
    html: `<a href="${process.env.HOSTNAME}/verifyme/${verifyCode}">click to verify your account</a>`,
  }

  console.log('transporter sending mail')
  transporter.sendMail(message, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
}
