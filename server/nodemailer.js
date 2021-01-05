const nodemailer = require('nodemailer');
const config = require('./config')

const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.EMAIL,
        pass: config.EMAILPASS
    }
})

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log("Email sent: ", info)
    })
}

module.exports = mailer