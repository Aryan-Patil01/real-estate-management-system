const pool = require('../db');

// Get all properties
const getAllProperties = async () => {
  const [rows] = await pool.query('SELECT * FROM properties');
  return rows;
};

// Get property by ID with images
const getPropertyById = async (id) => {
  const [property] = await pool.query(
    'SELECT * FROM properties WHERE id = ?',
    [id]
  );

  const [images] = await pool.query(
    'SELECT * FROM property_images WHERE property_id = ?',
    [id]
  );

  return { ...property[0], images };
};

// Get user by email
const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  return rows[0];
};

module.exports = {
  getAllProperties,
  getPropertyById,
  getUserByEmail,
};