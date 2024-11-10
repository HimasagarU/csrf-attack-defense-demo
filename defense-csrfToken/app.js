const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/csrf-token-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'verysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
}));
const csrfProtection = csrf();
app.use(csrfProtection);
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for the views
app.set('views', './views');

// Render login page with CSRF token
app.get('/login', csrfProtection, (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
});

app.get('/home', csrfProtection, (req, res) => {
    res.render('home', { csrfToken: req.csrfToken() });
});

// Handle login
app.post('/login', csrfProtection, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
        req.session.userId = user._id;
        res.render('home', { csrfToken: req.csrfToken() });
    } else {
        res.render('invalid', { csrfToken: req.csrfToken() });
    }
});

// Render change password page with CSRF token
app.get('/change-password', csrfProtection, (req, res) => {
    if (!req.session.userId) {
        return res.render('invalid', { csrfToken: req.csrfToken() });
    }
    res.render('change-password', { csrfToken: req.csrfToken() });
});

// Handle password change with CSRF token validation
app.post('/change-password', csrfProtection, async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
    }
    await User.findByIdAndUpdate(req.session.userId, { password: req.body.newPassword });
    res.render('passwordChanged', { csrfToken: req.csrfToken() });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000/home'));
