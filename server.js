const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const project = require('./routes/api/project');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

dotenv.config();
// DB config
const db = process.env.MONGO_URI;
//Connect to MONGODB
mongoose
  .connect(db)
  .then(()=> console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/project', project);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));