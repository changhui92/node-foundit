const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var {User} = require('./models/user');
var {Lost} = require('./models/lost');
var {Found} = require('./models/found');
var {authenticate} = require('./middleware/authenticate');

mongoose.Promise = global.Promise;

mongoose.connect((process.env.MONGO_URI || 'mongodb://localhost:27017/Foundit'), {
  useMongoClient: true
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['matric', 'password','email']);
  var user = User(body);

  user.save().then(() => {
    return generateAuthToken;
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.post('/lost', authenticate, (req,res) => {
  var body = _.pick(req.body, ['name', 'description', 'creator', 'status']);
  var lost = Lost(body);

  lost.save().then((lost) => {
    res.send(lost);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.post('/found', authenticate, (req,res) => {
  var body = _.pick(req.body, ['name', 'description', 'creator', 'status']);
  var found = Found(body);

  lost.save().then((found) => {
    res.send(found);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
