const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var {User} = require('./models/user');
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

// POST /users
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
