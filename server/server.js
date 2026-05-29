const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');

const authRoutes = require('./routes/auth.routes');
const propertyRoutes = require('./routes/property.routes');
const searchRoutes = require('./routes/search.routes');
const bookingRoutes = require('./routes/booking.routes');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Static Uploads Folder */
app.use('/uploads', express.static('uploads'));

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);

/* Home Route */
app.get('/', (req, res) => {
  res.send('Real Estate API is running');
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* Database Test */
pool.query('SELECT 1')
  .then(() => {
    console.log('✅ MySQL connected successfully');
  })
  .catch((err) => {
    console.log('❌ MySQL connection failed:', err.message);
  });