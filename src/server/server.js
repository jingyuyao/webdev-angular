require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const addUserService = require('./services/user.service');
const addSectionService = require('./services/section.service');
const addEnrollmentService = require('./services/enrollment.service');

const app = express();

console.log('Configuring server...');
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

console.log('Setting up static file serving...');
app.use(express.static(path.join(__dirname, '..', '..', 'dist/webdev-angular')));

console.log('Adding services...');
addUserService(app);
addSectionService(app);
addEnrollmentService(app);

console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI);

const port = process.env.PORT || 8080;
console.log(`Listening on port ${port}...`);
app.listen(port);
