const express = require('express');

const router = express.Router();

const pool = require('../db');

const {
  verifyToken
} = require('../middleware/auth.middleware');


/* =========================
   BOOK PROPERTY VISIT
========================= */

router.post('/', verifyToken, async (req, res) => {

  try {

    const {
      property_id,
      visit_date
    } = req.body;

    const user_id = req.user.id;

    // Prevent admin/agent booking
    if (
      req.user.role === 'admin' ||
      req.user.role === 'agent'
    ) {

      return res.status(403).json({
        message:
          'Agents/Admins cannot book visits'
      });
    }

    await pool.execute(

      `INSERT INTO bookings
      (user_id, property_id, visit_date)
      VALUES (?, ?, ?)`,

      [
        user_id,
        property_id,
        visit_date
      ]
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


/* =========================
   GET BOOKINGS
========================= */

router.get('/', verifyToken, async (req, res) => {

  try {

    let rows = [];

    /* ADMIN */
    if (req.user.role === 'admin') {

      const [result] = await pool.execute(

        `SELECT

          bookings.id,
          bookings.visit_date,
          bookings.user_id,

          users.name AS user_name,
          users.email AS user_email,

          properties.id AS property_id,
          properties.name AS property_name,
          properties.agent_id

        FROM bookings

        JOIN properties
        ON bookings.property_id = properties.id

        JOIN users
        ON bookings.user_id = users.id

        ORDER BY bookings.visit_date DESC`
      );

      rows = result;
    }

    /* AGENT */
    else if (req.user.role === 'agent') {

      const [result] = await pool.execute(

        `SELECT

          bookings.id,
          bookings.visit_date,
          bookings.user_id,

          users.name AS user_name,
          users.email AS user_email,

          properties.id AS property_id,
          properties.name AS property_name,
          properties.agent_id

        FROM bookings

        JOIN properties
        ON bookings.property_id = properties.id

        JOIN users
        ON bookings.user_id = users.id

        WHERE properties.agent_id = ?

        ORDER BY bookings.visit_date DESC`,

        [req.user.id]
      );

      rows = result;
    }

    /* USER */
    else {

      const [result] = await pool.execute(

        `SELECT

          bookings.id,
          bookings.visit_date,
          bookings.user_id,

          users.name AS user_name,
          users.email AS user_email,

          properties.id AS property_id,
          properties.name AS property_name,
          properties.agent_id

        FROM bookings

        JOIN properties
        ON bookings.property_id = properties.id

        JOIN users
        ON bookings.user_id = users.id

        WHERE bookings.user_id = ?

        ORDER BY bookings.visit_date DESC`,

        [req.user.id]
      );

      rows = result;
    }

    // Add status
    const bookings = rows.map((booking) => {

      // mysql2 converts DATETIME columns to JS Date objects using
      // the server's local timezone. Re-format using local getters
      // (not UTC) so the time the user picked is preserved exactly.
      const rawDate = booking.visit_date;

      const visitDateStr =
        rawDate instanceof Date
          ? `${rawDate.getFullYear()}-` +
            `${String(rawDate.getMonth() + 1).padStart(2, '0')}-` +
            `${String(rawDate.getDate()).padStart(2, '0')}T` +
            `${String(rawDate.getHours()).padStart(2, '0')}:` +
            `${String(rawDate.getMinutes()).padStart(2, '0')}:` +
            `${String(rawDate.getSeconds()).padStart(2, '0')}`
          : rawDate;

      const visitDate = new Date(visitDateStr);
      const now = new Date();

      return {

        ...booking,

        visit_date: visitDateStr,

        status:
          visitDate > now
            ? 'Upcoming'
            : 'Completed'
      };
    });

    res.json(bookings);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        'Error fetching bookings'
    });
  }
});

module.exports = router;