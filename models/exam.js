const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExamSchema = new Schema({
  exam_type: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

exports.ExamSchema = ExamSchema;
