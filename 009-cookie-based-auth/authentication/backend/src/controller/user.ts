import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import dayjs from "dayjs";

import { pool } from "../db"
import { generateOTP } from "../utils/helper";
import { sendOTPEmail } from "../utils/mailer";

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// this is just for demo purpose
// const registerNewUser = async (req: Request, res: Response): Promise<Response> => {
//     const { email, password } = req.body;
//     const saltRounds = 12;

//     if (!email || !password)
//         return res.status(400).json({ message: 'Email and password are required' });

//     if (!isValidEmail(email))
//         return res.status(400).json({ message: 'Invalid email' });

//     try {
//         const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (userResult.rows.length > 0)
//             return res.status(409).json({ message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const result = await pool.query(
//             'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
//             [email, hashedPassword]
//         );

//         return res.status(200).json(result.rows[0]);
//     } catch (error: unknown) {
//         console.error('Error registering new user:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

const OTPLogin = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    if (!email)
        return res.status(400).json({ message: 'Email is required' });

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length === 0) {
            const { rows } = await pool.query('INSERT INTO users (email) VALUES ($1) RETURNING id', [email]);

            const otp = generateOTP();

            await pool.query('INSERT INTO otps (email_id, otp_code) VALUES ($1, $2)', [email, otp]);
            await sendOTPEmail(email, otp);

            return res.status(201).json({ message: 'OTP sent' });
        }

        const previousOTP = await pool.query('SELECT * FROM otps WHERE email_id = $1 AND is_used = false', [email]);

        if (previousOTP.rows.length > 0) {
            const { created_at } = previousOTP.rows[0];

            if (dayjs(created_at).isAfter(dayjs().subtract(5, "minutes")))
                return res.status(400).json({ message: 'OTP has already been sent' });
        }

        const otp = generateOTP();
        await pool.query('INSERT INTO otps (email_id, otp_code) VALUES ($1, $2)', [email, otp]);
        await sendOTPEmail(email, otp);

        return res.status(201).json({ message: 'OTP sent' });
    } catch (error: unknown) {
        console.error('Error registering new user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {
    // registerNewUser,
    OTPLogin
}