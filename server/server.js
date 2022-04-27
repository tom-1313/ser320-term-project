require("dotenv").config({ path: "../.env" });
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ptofl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const User = require("./models/user");
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));


// Routes
app.use("/user", userRouter);

app.listen(process.env.DB_PORT, () => {
  console.log(`Server started on port ${process.env.DB_PORT}`);
});
