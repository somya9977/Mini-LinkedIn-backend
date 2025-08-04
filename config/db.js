const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'appuser',       // use 'root' if you prefer
  password: 'mypassword',
  database: 'mini_linkedin'
});

module.exports = pool;
