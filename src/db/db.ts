const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Ensure that the CONNECTION1 environment variable is set correctly with your PostgreSQL connection URL.
const connectionString = process.env.CONNECTION2;

const pool = new Pool({
  connectionString: connectionString,
});

// Handle connection errors and log success
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
  })
  .catch((e:Error) => {
    console.error('Error connecting to PostgreSQL database: ', e);
  });

// Export the database pool for use in other parts of your application
module.exports = pool;
