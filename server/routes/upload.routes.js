const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../db');
const { verifyAgentOrAdmin } = require('../middleware/auth.middleware');

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

// UPLOAD PROPERTY IMAGE
router.post(
  '/',
  verifyAgentOrAdmin,
  upload.single('image'),
  async (req, res) => {

    const { property_id } = req.body;

    try {

      const imageUrl = `/uploads/${req.file.filename}`;

      await pool.query(
        `INSERT INTO property_images
        (property_id, image_url)
        VALUES (?, ?)`,
        [property_id, imageUrl]
      );

      res.status(201).json({
        message: 'Image uploaded successfully.',
        imageUrl
      });

    } catch (err) {
      res.status(500).json({
        message: 'Server error.',
        error: err.message
      });
    }
  }
);

module.exports = router;