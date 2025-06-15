const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { initDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(express.static(__dirname + '/public'));

// Initialize DB
initDB();

// Routes
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Start server
app.get('/', (req, res) => {
  res.send('Welcome to the app!'); // or res.render('login');
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));