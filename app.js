'use strict';

const express = require('express');
const handlebars = require('express-handlebars');

const PORT = 5000;
const app = express();

// middleware
app.use(express.static('static'));
app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
  res.render('index');
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});