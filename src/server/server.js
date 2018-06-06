require('dotenv').config();
const express = require('express');
const path = require('path');

require('./db');

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'dist/webdev-angular')));

app.listen(process.env.PORT || 8080);
