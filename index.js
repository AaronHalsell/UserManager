const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('uuid');


// Set up middlewares
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // for serving static assets'
app.set('views', './views');
app.set('view engine', 'pug');

// read the users.json file
let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

// Set up routes
app.get('/form', (req, res) => {
  res.render('form', { user: {} });
});

app.get('/', (req, res) => {
  res.redirect('/list');
});

// After user clicks submit
app.post('/createUser', (req, res) => {
  const user = {
    userId: uuid.v4(),
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.users.push(user);
  let data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.redirect('/list');
});

app.get('/list', (req, res) => {
  let rawdata = fs.readFileSync('users.json');
  let users = JSON.parse(rawdata);
  res.render('list', { users: users.users });
});

app.get('/edit/:userId', (req, res) => {
  let rawdata = fs.readFileSync('users.json');
  let users = JSON.parse(rawdata);
  let user = users.users.find(user => user.userId == req.params.userId);
  res.render('edit', { user });
});

app.post('/edit/:userId', (req, res) => {
  let rawdata = fs.readFileSync('users.json');
  let users = JSON.parse(rawdata);
  let user = users.users.find(user => user.userId == req.params.userId);
  user.username = req.body.username;
  user.name = req.body.name;
  user.email = req.body.email;
  user.age = req.body.age;

  let data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.redirect('/list');
});

app.get('/delete/:userId', (req, res) => {

  let rawdata = fs.readFileSync('users.json');
  let users = JSON.parse(rawdata);
  users.users = users.users.filter(user => user.userId !== req.params.userId);
  let data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.redirect('/list');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});