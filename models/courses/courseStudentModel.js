const { required } = require('joi');
const mongoose = require('mongoose');
const { trim } = require('validator');
const courseStudentSchema = new mongoose.Schema(
  {
    studentId: {
      type: Number,
      unique: [true, "studentId must be unique"],
      required:[true,"studentId is required"]
    },
    
    course_Id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "course_Id is required"],
      ref: "courses"
    },
    progress: {
      type: String,
      trim:true,
    }
  },
  { timestamps: true }
);
const courseStudentModel = mongoose.model('CourseStudent', courseStudentSchema);

module.exports = courseStudentModel;