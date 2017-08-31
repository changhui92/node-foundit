const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var {User} = require('./models/user');

mongoose.Promise = global.Promise;

mongoose.connect((process.env.MONGO_URI || 'mongodb://localhost:27017/Foundit'), {
  useMongoClient: true
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {

  var user = new User({
    matric: req.body.matric,
    password: req.body.password,
    faculty: req.body.faculty,
    school: req.body.school,
    email: req.body.email
  });

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e)
  })
});

app.get('/users')

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
