const express = require('express');
const router = express.Router();

const pool = require('../db');

const {
  verifyAgentOrAdmin
} = require('../middleware/auth.middleware');

/* =========================
   GET ALL PROPERTIES
========================= */

router.get('/', async (req, res) => {

  try {

    const [properties] = await pool.query(`
      SELECT
        properties.*,

        (
          SELECT image_url
          FROM property_images
          WHERE property_images.property_id = properties.id
          LIMIT 1
        ) AS uploaded_image

      FROM properties
    `);

    for (let property of properties) {

      const [images] = await pool.query(
        'SELECT * FROM property_images WHERE property_id = ?',
        [property.id]
      );

      property.images = images;
    }

    res.json(properties);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});

/* =========================
   GET SINGLE PROPERTY
========================= */

router.get('/:id', async (req, res) => {

  try {

    const [rows] = await pool.query(
      'SELECT * FROM properties WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        message: 'Property not found'
      });
    }

    const [images] = await pool.query(
      'SELECT * FROM property_images WHERE property_id = ?',
      [req.params.id]
    );

    res.json({
      ...rows[0],
      images
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});

/* =========================
   ADD PROPERTY
========================= */

router.post(
  '/',
  verifyAgentOrAdmin,

  async (req, res) => {

    const {
      name,
      description,
      location,
      city,
      price,
      type,
      rooms,
      availability,
      contact
    } = req.body;

    try {

      const [result] = await pool.query(
        `
        INSERT INTO properties
        (
          name,
          description,
          location,
          city,
          price,
          type,
          rooms,
          availability,
          contact,
          agent_id
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          name,
          description,
          location,
          city,
          price,
          type,
          rooms,
          availability,
          contact,
          req.user.id
        ]
      );

      res.status(201).json({
        message: 'Property added successfully',
        propertyId: result.insertId
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: 'Server error',
        error: err.message
      });
    }
  }
);

/* =========================
   UPDATE PROPERTY
========================= */

router.put(
  '/:id',
  verifyAgentOrAdmin,

  async (req, res) => {

    const {
      name,
      description,
      location,
      city,
      price,
      type,
      rooms,
      availability,
      contact
    } = req.body;

    try {

      await pool.query(
        `
        UPDATE properties

        SET
          name = ?,
          description = ?,
          location = ?,
          city = ?,
          price = ?,
          type = ?,
          rooms = ?,
          availability = ?,
          contact = ?

        WHERE id = ?
        `,
        [
          name,
          description,
          location,
          city,
          price,
          type,
          rooms,
          availability,
          contact,
          req.params.id
        ]
      );

      res.json({
        message: 'Property updated successfully'
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: 'Server error',
        error: err.message
      });
    }
  }
);

/* =========================
   DELETE PROPERTY
========================= */

router.delete(
  '/:id',
  verifyAgentOrAdmin,

  async (req, res) => {

    try {

      await pool.query(
        'DELETE FROM property_images WHERE property_id = ?',
        [req.params.id]
      );

      await pool.query(
        'DELETE FROM properties WHERE id = ?',
        [req.params.id]
      );

      res.json({
        message: 'Property deleted successfully'
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: 'Server error',
        error: err.message
      });
    }
  }
);

module.exports = router;