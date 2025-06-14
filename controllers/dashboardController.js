// controllers/dashboardController.js

function studentDashboard(req, res) {
  res.render('dashboard', { user: req.session.user });
}

function teacherDashboard(req, res) {
  res.render('dashboard', { user: req.session.user });
}

function advisorDashboard(req, res) {
  res.render('dashboard', { user: req.session.user });
}

module.exports = {
  studentDashboard,
  teacherDashboard,
  advisorDashboard
};
