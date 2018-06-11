require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const addUserService = require('./services/user.service');
const addSectionService = require('./services/section.service');
const addEnrollmentService = require('./services/enrollment.service');

const app = express();

console.log('Configuring server...');
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

console.log('Adding services...');
addUserService(app);
addSectionService(app);
addEnrollmentService(app);

console.log('Setting up static file serving...');
app.use(express.static(path.join(__dirname, '..', '..', 'dist/webdev-angular')));
const indexHtml = path.join(__dirname, '..', '..', 'dist/webdev-angular/index.html');
app.use('/', (req, res) => res.sendFile(indexHtml));

console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI);

const port = process.env.PORT || 8080;
console.log(`Listening on port ${port}...`);
app.listen(port);
