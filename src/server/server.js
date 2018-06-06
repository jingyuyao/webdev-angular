require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'dist/webdev-angular')));

app.listen(process.env.PORT || 8080);
