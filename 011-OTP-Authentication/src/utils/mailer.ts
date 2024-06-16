import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "youremail@gmail.com",
        pass: "yourpassword"
    }
});

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
    const mailOptions = {
        from: "demoemailtestingservice@gmail.com",
        to: email,
        subject: 'Your OTP Code',
        text: `
        Your OTP code is ${otp}. It will expire in 5 minutes.`,
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}