const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/csrf-samesite-demo', {
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
    cookie: {
        httpOnly: true,
        sameSite: 'Strict' // SameSite=Strict to prevent CSRF
    }
}));
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for the views
app.set('views', './views');

// Render login page
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    res.render('home');
});

// Handle login
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
        req.session.userId = user._id;
        res.redirect('/home');
    } else {
        res.render('invalid');
    }
});

// Render change password page
app.get('/change-password', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('change-password');
});

// Handle password change
app.post('/change-password', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
    }
    await User.findByIdAndUpdate(req.session.userId, { password: req.body.newPassword });
    res.render('passwordchange');
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000/home'));
