import { Request, Response } from "express";
import dayjs from 'dayjs';

import { pool } from "../db"
import { sendOTPEmail } from '../utils/mailer';
import { generateOTP } from "../utils/helper";


// const RequestOTP = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { email } = req.body;

//         if (!email)
//             return res.status(400).json({ message: 'Email is required' });

//         const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (userResult.rows.length === 0)
//             return res.status(404).json({ message: 'User not found' });

//         const otp = generateOTP();
//         const expiresAt = dayjs().add(5, 'minute').toISOString();

//         await pool.query(
//             'INSERT INTO otps (email_id, otp_code, expires_at) VALUES ($1, $2, $3)',
//             [email, otp, expiresAt]
//         );

//         await sendOTPEmail(email, otp);

//         return res.status(201).json({ message: 'OTP sent' });
//     } catch (error) {
//         console.error('Error requesting OTP:', error);
//         const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
//         return res.status(500).json({ message: errorMessage });
//     }
// };

const VerifyOTP = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp } = req.body;

    if (!email || !otp)
        return res.status(400).json({ message: 'Email and OTP are required' });

    try {
        const otpResult = await pool.query(
            'SELECT * FROM otps WHERE email_id = $1 AND otp_code = $2 AND is_used = false',
            [email, otp]
        );

        if (otpResult.rows.length === 0)
            return res.status(404).json({ message: 'Invalid OTP' });

        const { expires_at } = otpResult.rows[0];

        if (dayjs(expires_at).isBefore(dayjs()))
            return res.status(400).json({ message: 'OTP has expired' });

        await pool.query('UPDATE otps SET is_used = true WHERE email_id = $1 AND otp_code = $2', [email, otp]);

        return res.status(200).json({ message: 'OTP verified' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export {
    // RequestOTP,
    VerifyOTP
};
