const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not set. Set it in .env before running the API.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false
});

// Helper function to query the database
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  query
};
