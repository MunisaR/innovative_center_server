const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
const port = 8000;
const twilio = require("twilio");

const cors = require("cors");
const {
  UserSchema,
  ExamSchema,
  IeltsUserSchema,
} = require("./database/connection");
const app = express();
app.use(cors("*"));
app.use(bodyParser.json());

///////////////// CRUD for User /////////////////
app.post("/api/user", async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    client.messages
      .create({
        to: "+998905850789", // Replace with the recipient's phone number
        from: "900174290", // Replace with your Twilio number
        body: "Hello from Twilio and MrHumble!",
      })
      .then((message) => console.log(message.sid));
    res.json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

app.post("/api/ielts_user", async (req, res) => {
  try {
    const ielts_user = await IeltsUserSchema.create(req.body);
    res.json({ ielts_user: ielts_user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

app.get("/api/allUsers", async (req, res) => {
  const mix = await UserSchema.find({});
  const ielts = await IeltsUserSchema.find({});
  const users = [...mix, ...ielts];

  res.json({ users: users });
});

app.get("/api/allExams", async (req, res) => {
  const exams = await ExamSchema.find({});
  console.log(exams);
  res.json({ exams });
});

///////////////// CRUD for Exam /////////////////
app.post("/api/exam", async (req, res) => {
  try {
    console.log(req.body);
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

app.put("/api/exams/edit", async (req, res) => {
  try {
    console.log(req.body);
    const _id = req.body._id;
    const exam = req.body.exam;
    ExamSchema.replaceOne(
      { _id: _id },
      exam,
      // If `new` isn't true, `findOneAndUpdate()` will return the
      // document as it was _before_ it was updated.
      { new: true }
    );
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
