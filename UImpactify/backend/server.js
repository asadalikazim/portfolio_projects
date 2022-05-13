const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const cors = require('cors');
const mainRouter = require('./Routes/index');
require('dotenv').config();

// -----------------------------------------DATABASE CONNECTION----------------------------------------------------
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection established to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

// -----------------------------------------MIDDLEWARES-----------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8000', // This is the location of the react app we are connecting to
    credentials: true,
  })
);
// Every middleware below is for passport
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// -----------------------------------------ROUTES-----------------------------------------------------------
app.use('/', mainRouter(app, passport)); // Routes exported to their own folder

// ---------------------------------------SERVER INIT--------------------------------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started @PORT ${PORT}`);
});
