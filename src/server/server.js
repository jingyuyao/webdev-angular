require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const addUserService = require('./services/user.service');

const app = express();

console.log('Configuring server...');
app.use(bodyParser.json());

console.log('Setting up static file serving...');
app.use(express.static(path.join(__dirname, '..', '..', 'dist/webdev-angular')));

console.log('Adding services...');
addUserService(app);

console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI);

const port = process.env.PORT || 8080;
console.log(`Listening on port ${port}...`);
app.listen(port);
