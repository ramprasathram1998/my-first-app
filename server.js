const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(ejsLayouts);
app.use(express.static('public'));

const homeRoute = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoute);

app.listen(3000, () => console.log("server started......"));


