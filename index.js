const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

const Task = mongoose.model("task", {
  title: String
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/todo-app",
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  Task.find().exec((err, tasks) => {
    if (err) {
      return res.status(400).json({ error: "An error occurred" });
    }
    return res.json(tasks);
  });
});

app.post("/create", (req, res) => {
  const task = new Task({ title: req.body.title });
  task.save(err => {
    if (err) {
      return res.status(400).json({ error: "An error occurred" });
    }
    return res.json(task);
  });
});

app.listen(process.env.PORT || 3100, () => {
  console.log("Server started");
});
