const mysql = require('mysql2');
let db;

module.exports.initDB = () => {
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newpassword',
    database: 'attendancee',
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