const authRoutes = require('./routes/auth.routes');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/properties', require('./routes/property.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/upload', require('./routes/upload.routes'));


app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Real Estate API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const pool = require('./db');

pool.query('SELECT 1')
  .then(() => console.log('✅ MySQL connected successfully'))
  .catch((err) => console.log('❌ MySQL connection failed:', err.message));