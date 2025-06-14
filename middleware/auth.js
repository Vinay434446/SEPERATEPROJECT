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
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.session.user.role === role) return next();
    return res.sendStatus(403);
  };
}

module.exports = { isAuthenticated, checkRole };

module.exports.getDB = () => db;