const express = require('express');
const router = express.Router();

router.get('/', ctrl.loginPage); // ✅ This handles GET /
const {
  loginPage,
  loginPost,
  logout,
  registerPage,
  registerPost,
  teacherRegisterPage,
  teacherRegisterPost,
  advisorRegisterPage,
  advisorRegisterPost
} = require('../controllers/authController');

router.get('/login', loginPage);
router.post('/login', loginPost);
router.get('/logout', logout);

router.get('/register', registerPage);
router.post('/register', registerPost);

router.get('/teacher/register', teacherRegisterPage);
router.post('/teacher/register', teacherRegisterPost);

router.get('/advisor/register', advisorRegisterPage);
router.post('/advisor/register', advisorRegisterPost);

module.exports = router;

