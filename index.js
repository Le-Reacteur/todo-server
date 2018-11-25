const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/todo-app",
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3100, () => {
  console.log("Server started");
});
