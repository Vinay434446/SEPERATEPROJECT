const mysql = require('mysql2');
let db;

module.exports.initDB = () => {
  db = mysql.createConnection({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
    timezone: 'local',
    dateStrings: true
  });
  db.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
      process.exit(1);
    }
    console.log('Connected to MySQL.');
  });
};

module.exports.getDB = () => db;