require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log("<___BODY LOGGER START_____>");
  console.log(req.body);
  console.log("<___BODY LOGGER END_______>");
  next();
})

app.use('/api/v1/posts', require('./api/posts.js'));

app.use('/auth', require('./auth/index.js'));

app.listen(PORT || 3001, () => {
	console.log(`listening on port`, PORT)
});