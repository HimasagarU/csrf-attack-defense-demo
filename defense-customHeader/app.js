const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/csrf-custom-header-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Support JSON bodies for AJAX requests
app.use(session({
    secret: 'verysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'Lax' // Allows CSRF-protected same-site cookies
    }
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware: Custom header check for CSRF defense
app.use((req, res, next) => {
    // For any POST requests, check if the 'X-Requested-With' header is set to 'XMLHttpRequest'
    if (req.method === 'POST' && req.headers['x-requested-with'] !== 'XMLHttpRequest') {
        return res.status(403).send('Forbidden: Missing custom header');
    }
    next();
});

// Render login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Render home page, check if user is logged in
app.get('/home', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('home');
});

// Handle login with AJAX request and custom header
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
        req.session.userId = user._id;
        res.json({ success: true, redirectUrl: '/home' }); // Send JSON response for AJAX
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Render change-password page with AJAX form
app.get('/change-password', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('change-password');
});

// Handle password change with custom header protection
app.post('/change-password', async (req, res) => {
  if (!req.session.userId) {
      return res.status(401).render('error', { message: 'Unauthorized access' });
  }

  // Update the user's password in the database
  await User.findByIdAndUpdate(req.session.userId, { password: req.body.newPassword });

  // Render the passwordchange.ejs page upon successful password change
  res.render('passwordchange');
});


// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000/login'));
