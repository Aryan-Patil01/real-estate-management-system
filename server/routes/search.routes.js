const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const {
    city,
    min_price,
    max_price,
    type,
    availability
  } = req.query;

  try {

    let query = 'SELECT * FROM properties WHERE 1=1';
    const params = [];

    if (city) {
      query += ' AND city LIKE ?';
      params.push(`%${city}%`);
    }

    if (min_price) {
      query += ' AND price >= ?';
      params.push(min_price);
    }

    if (max_price) {
      query += ' AND price <= ?';
      params.push(max_price);
    }

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (availability) {
      query += ' AND availability = ?';
      params.push(availability);
    }

    const [results] = await pool.query(query, params);

    for (let p of results) {
      const [images] = await pool.query(
        'SELECT * FROM property_images WHERE property_id = ?',
        [p.id]
      );

      p.images = images;
    }

    res.json(results);

  } catch (err) {
    res.status(500).json({
      message: 'Server error.',
      error: err.message
    });
  }
});

module.exports = router;