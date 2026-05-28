const express = require('express');
const router = express.Router();

const pool = require('../db');

const { verifyToken } = require('../middleware/auth.middleware');


// BOOK VISIT
router.post('/', verifyToken, async (req, res) => {

    try {

        const { property_id, visit_date } = req.body;

        const user_id = req.user.id;

        await pool.execute(
            `INSERT INTO bookings (user_id, property_id, visit_date)
             VALUES (?, ?, ?)`,
            [user_id, property_id, visit_date]
        );

        res.json({
            message: 'Booking successful'
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Booking failed'
        });
    }
});


// GET ALL BOOKINGS
router.get('/', verifyToken, async (req, res) => {

    try {

        const [bookings] = await pool.execute(
            `SELECT * FROM bookings`
        );

        res.json(bookings);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Error fetching bookings'
        });
    }
});

module.exports = router;