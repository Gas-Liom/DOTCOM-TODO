const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'perntodo',
  password: 'alexinard',
  port: 5432,
});

module.exports = pool;
