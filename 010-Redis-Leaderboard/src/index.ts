import express from 'express';
import pool from './db';

const app = express();
const port = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Current Time: ${result.rows[0].now}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
