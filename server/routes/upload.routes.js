const express = require('express');
const router = express.Router();

const multer = require('multer');

const pool = require('../db');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + '-' + file.originalname
    );
  }
});

const upload = multer({ storage });

router.post(
  '/:propertyId',

  upload.array('images', 10),

  async (req, res) => {

    try {

      const { propertyId } = req.params;

      for (const file of req.files) {

        const imageUrl =
          `/uploads/${file.filename}`;

        await pool.query(
          `INSERT INTO property_images
           (property_id, image_url)
           VALUES (?, ?)`,
          [propertyId, imageUrl]
        );
      }

      res.json({
        message: 'Images uploaded successfully'
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: 'Upload failed'
      });
    }
  }
);

module.exports = router;