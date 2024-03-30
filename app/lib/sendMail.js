
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', // Your SMTP host
    port: 587, // Your SMTP port
    auth: {
        user: 'bms.php.no.reply@gmail.com', // Your SMTP username
        pass: 'yuwk gjcb neen zhtw', // Your SMTP password
    },
});

async function sendEmail(email, otp) {
    // Define email options
    const mailOptions = {
        from: {
            name: 'QuizMania',
            address: 'bms.php.no.reply@gmail.com',
        }, // Sender address
        to: email, // Recipient address
        subject: 'Your OTP for Authentication',
        text: `Your OTP is ${otp}`,
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

export default sendEmail;
