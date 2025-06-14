// controllers/authController.js
const dbModule = require('../config/db');
const User = require('../models/User');

// GET /login
function loginPage(req, res) {
  res.render('login', { error: null, role: '', email: '' });
}

// POST /login
function loginPost(req, res) {
  const db = dbModule.getDB();
  const { role, email, password, branch, sem, section } = req.body;

  // Advisor validation
  if (role === 'advisor' && (!branch || !sem || !section)) {
    return res.render('login', {
      error: 'Please specify branch, semester & section.',
      role,
      email
    });
  }

  // Authenticate user
  const query = `SELECT * FROM users WHERE email = ? AND password = ? AND role = ? AND is_deleted = 0`;
  db.query(query, [email.trim(), password, role], (err, results) => {
    if (err) {
      return res.render('login', { error: 'Database error.', role, email });
    }
    if (!results.length) {
      return res.render('login', { error: 'Invalid credentials.', role, email });
    }

    // Success
    req.session.user = results[0];
    if (role === 'advisor') {
      Object.assign(req.session.user, { branch, sem, section });
    }
    return res.redirect(`/dashboard/${role}`);
  });
}

// GET /logout
function logout(req, res) {
  req.session.destroy();
  res.redirect('/login');
}

// GET /register
function registerPage(req, res) {
  res.render('register', { error: null, usn: '', name: '', email: '' });
}

// POST /register (Student)
function registerPost(req, res) {
  const db = dbModule.getDB();
  const { usn, name, email, password } = req.body;
  const checkQuery = `SELECT id, email FROM users WHERE usn = ? AND role='student' AND is_deleted=0`;

  db.query(checkQuery, [usn.trim()], (err, rows) => {
    if (err) {
      return res.render('register', { error: 'Server error.', usn, name, email });
    }
    if (!rows.length) {
      return res.render('register', { error: 'USN not found.', usn, name, email });
    }
    if (rows[0].email) {
      return res.render('register', { error: 'Already registered.', usn, name, email });
    }

    const updateQuery = `UPDATE users SET name=?, email=?, password=? WHERE id=?`;
    db.query(updateQuery, [name.trim(), email.trim(), password, rows[0].id], (err2) => {
      if (err2) {
        return res.render('register', { error: 'Failed to register.', usn, name, email });
      }
      res.redirect('/login');
    });
  });
}

// GET /teacher/register
function teacherRegisterPage(req, res) {
  res.render('teacherRegister', { error: null, email: '', name: '' });
}

// POST /teacher/register
function teacherRegisterPost(req, res) {
  const db = dbModule.getDB();
  const { email, name, password } = req.body;
  const role = 'teacher';

  if (!email || !name || !password) {
    return res.render('teacherRegister', { error: 'All fields required.', email, name });
  }
  const query = `INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)`;
  db.query(query, [email.trim(), name.trim(), password, role], (err) => {
    if (err) {
      return res.render('teacherRegister', { error: 'Registration failed.', email, name });
    }
    res.redirect('/login');
  });
}

// GET /advisor/register
function advisorRegisterPage(req, res) {
  res.render('advisorRegister', { error: null, email: '', name: '' });
}

// POST /advisor/register
function advisorRegisterPost(req, res) {
  const db = dbModule.getDB();
  const { email, name, password } = req.body;
  const role = 'advisor';

  if (!email || !name || !password) {
    return res.render('advisorRegister', { error: 'All fields required.', email, name });
  }
  const query = `INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)`;
  db.query(query, [email.trim(), name.trim(), password, role], (err) => {
    if (err) {
      return res.render('advisorRegister', { error: 'Registration failed.', email, name });
    }
    res.redirect('/login');
  });
}

module.exports = {
  loginPage,
  loginPost,
  logout,
  registerPage,
  registerPost,
  teacherRegisterPage,
  teacherRegisterPost,
  advisorRegisterPage,
  advisorRegisterPost
};
