
import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', // Your SMTP host
    port: 587, // Your SMTP port
    auth: {
        user: 'oaishazher@gmail.com', // Your SMTP username
        pass: 'ehxi lowb mmah vqpo', // Your SMTP password
    },
});

async function sendEmail(email, otp) {
    // Define email options
    const mailOptions = {
        from: {
            name: 'QuizMania',
            address: 'oaishazher@gmail.com',
        }, // Sender address
        to: email, // Recipient address
        subject: 'Your OTP for Authentication',
        text: `Your OTP is ${otp}`,
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

export default sendEmail;
