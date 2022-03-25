require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ptofl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "))

app.use('/user', userRouter);

app.listen(process.env.DB_PORT, () => {
  console.log(`Server started on port ${process.env.DB_PORT}`);
});
