// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { isAuthenticated, checkRole } = require('../middleware/auth');
const {
  studentDashboard,
  teacherDashboard,
  advisorDashboard
} = require('../controllers/dashboardController');

router.get('/student', isAuthenticated, checkRole('student'), studentDashboard);
router.get('/teacher', isAuthenticated, checkRole('teacher'), teacherDashboard);
router.get('/advisor', isAuthenticated, checkRole('advisor'), advisorDashboard);

module.exports = router;
