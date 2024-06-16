import { Router } from 'express';
import pool from '../db';
import { Student } from '../model/student';

const router = Router();

/*
 * this is a very bad practice!!! 
 * Please always make controllers for all routes
 * eg. /controller/Student.ts
 * const createStudent = .....
 * 
 * /routes/studentRoutes.ts
 * const router = Router();
 * router.post('/student', createStudent);
 */


// creating a new student
router.post('/student', async (req, res) => {
    const { Name, Score } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Students (Name, Score) VALUES ($1, $2) RETURNING *',
            [Name, Score]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});


// get all students
router.get('/student', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Students');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
})


// get a single student
router.get('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Students WHERE StdId = $1', [id]);

        if (result.rows.length === 0)
            return res.status(404).send('Student not found');

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});


// update a student
router.patch('/student/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, Score } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Students SET Name = $1, Score = $2, lastUpdated = CURRENT_TIMESTAMP WHERE StdId = $3 RETURNING *',
            [Name, Score, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});



// deleting a student
router.delete('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Students WHERE StdId = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});


export default router;