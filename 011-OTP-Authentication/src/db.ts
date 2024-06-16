import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.POSTGRES_USER as string,
    host: process.env.POSTGRES_HOST as string,
    database: process.env.POSTGRES_DB as string,
    password: process.env.POSTGRES_PASSWORD as string,
    port: process.env.POSTGRES_PORT as unknown as number,
});

// const createUsersTable = async () => {
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//     `;

//     try {
//         await pool.query(createTableQuery);
//         console.log('Users table created or already exists.');
//     } catch (error) {
//         console.error('Error creating users table:', error);
//     }
// };

// createUsersTable();
