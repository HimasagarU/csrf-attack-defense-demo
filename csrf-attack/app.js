const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/csrf-demo', {
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
  saveUninitialized: false
}));
app.use(express.static('views'));

// Route: Render login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

// Route: Handle login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && user.password === req.body.password) {
    req.session.userId = user._id;
    res.redirect('/home');
  } else {
    res.sendFile(__dirname + '/views/invalid.html');
  }
});

// Route: Render password change page
app.get('/change-password', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.sendFile(__dirname + '/views/change-password.html');
});

// Route: Handle password change
app.post('/change-password', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  await User.findByIdAndUpdate(req.session.userId, { password: req.body.newPassword });
  res.sendFile(__dirname + '/views/passwordchange.html');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:3000/home`);
});
