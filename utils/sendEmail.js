// email handler
const nodemailer = require('nodemailer');
module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS,
            }

        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log('email send successfully')
    } catch (error) {
        console.log(error, "email not sent")
    }


}




