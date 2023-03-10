const mongoose = require("mongoose");
const { ExamSchema } = require("../models/exam");
const { UserSchema } = require("../models/user");

const connectionString =
  "mongodb+srv://armeum:armeum@armeumdev.owmsjm0.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.connect(connectionString);

const User = mongoose.model("User", UserSchema);
const Exam = mongoose.model("Exam", ExamSchema);

exports.UserSchema = User;
exports.ExamSchema = Exam;
exports.connectionString = connectionString;
