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

    let query = `
      SELECT
        properties.*,

        (
          SELECT image_url
          FROM property_images
          WHERE property_images.property_id = properties.id
          LIMIT 1
        ) AS uploaded_image

      FROM properties

      WHERE 1=1
    `;

    const params = [];

    /* CITY FILTER */
    if (city) {

      query += ' AND city LIKE ?';

      params.push(`%${city}%`);
    }

    /* MIN PRICE */
    if (min_price) {

      query += ' AND price >= ?';

      params.push(min_price);
    }

    /* MAX PRICE */
    if (max_price) {

      query += ' AND price <= ?';

      params.push(max_price);
    }

    /* PROPERTY TYPE */
    if (type) {

      query += ' AND type = ?';

      params.push(type);
    }

    /* AVAILABILITY */
    if (availability) {

      query += ' AND availability = ?';

      params.push(availability);
    }

    query += ' ORDER BY id DESC';

    const [results] =
      await pool.query(query, params);

    // ADD ALL IMAGES
    for (let property of results) {

      const [images] =
        await pool.query(

          `SELECT *
           FROM property_images
           WHERE property_id = ?`,

          [property.id]
        );

      property.images = images;
    }

    res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message: 'Server error',

      error: err.message
    });
  }
});

module.exports = router;