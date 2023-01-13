const express = require('express');
const app = express();
const fs = require('fs');


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
    userId: Date.now(),
    name: req.body.name,
    email: req.body.email,
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
  // Retrieve the user with the specified userId from a file or database
  res.render('edit', { users: user });
});

app.post('/edit/:userId', (req, res) => {
  // Update the user with the specified userId with the provided form data
  res.redirect('/list');
});

app.get('/delete/:userId', (req, res) => {
  // Delete the user with the specified userId
  res.redirect('/list');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});