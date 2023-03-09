const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
const port = 8000;

const cors = require("cors");
const { UserSchema, ExamSchema } = require("./database/connection");
const app = express();
app.use(cors("*"));
app.use(bodyParser.json());

///////////////// CRUD for User /////////////////
app.post("/api/user", async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    res.json({ user: user });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/users", async (req, res) => {
  const users = await UserSchema.find({});
  res.json({ users: users });
});

///////////////// CRUD for Exam /////////////////
app.post("/api/exam", async (req, res) => {
  try {
    const exam = await ExamSchema.create(req.body);
    res.json({ exam: exam });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/exams", async (req, res) => {
  const exams = await ExamSchema.find({});
  res.json({ exams: exams });
});

app.patch("/api/exams/:id", async (req, res) => {
  try {
    const id = req.params.id;
    ExamSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/exam/:id", (req, res) => {
  ExamSchema.findOneAndRemove({ _id: req.params._id })
    .then((exam) => {
      if (!exam) {
        res.status(400).send(req.params._id + " was not found");
      } else {
        res.status(200).send(req.params._id + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.listen(port, (err) => {
  console.log("server listening on port" + port);
});
