import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER as string,
    host: process.env.POSTGRES_HOST as string,
    database: process.env.POSTGRES_DB as string,
    password: process.env.POSTGRES_PASSWORD as string,
    port: process.env.POSTGRES_PORT as unknown as number
});

export default pool;
