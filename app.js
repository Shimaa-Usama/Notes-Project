const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
const flash = require('connect-flash');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb+srv://admin:admin@shu.j3esi.mongodb.net/myProject',
  collection: 'mySessions'
});


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(flash())
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:false }));
app.use(require('./routes/register.routes'));
app.use(require('./routes/login.routes'));
app.use(require('./routes/home.routes'));
app.use(require('./routes/logout.routes'));
app.use(require('./CRUD/add'));
app.use(require('./CRUD/delete'));
app.use(require('./CRUD/update'));

app.get('*', (req, res, next) => {
  res.send('404 ERR!');
});

mongoose.connect('mongodb+srv://admin:admin@shu.j3esi.mongodb.net/myProject', {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on port 3000');
  
  });