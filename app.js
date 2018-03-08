'use strict';

const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();
const APP_TITLE = 'Paint your Code!';

// middleware
app.use(express.static('static'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app settings
app.set('view engine', 'handlebars');
app.set('json spaces', 4);

// routes
app.get('/', (req, res) => {
  res.render('index', {title: APP_TITLE});
});

app.post('/theme.json', (req, res) => {
  res.set('Content-Disposition', 'attachment;filename=theme.json');

  const theme = {
    type: 'dark',
    name: 'Your theme mame',
    colors: req.body
  };

  res.json(theme);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});