const asyncHandler = require("express-async-handler");
const examModel = require("../../models/courses/examModel");
const ApiError = require('../../validation/apiError');



//@dec create exam
//@route POST /api/exams
//@access private
exports.createExam = asyncHandler(async (req, res) => {
  const exam = await examModel.create(req.body);
  res.status(201).json({ data: exam });
});

    

//@dec get list of exams
//@route GET /api/exams
//@access public
exports.getExams = asyncHandler(async (req, res) => {
    const exams = await examModel.find({})
    res.status(200).json({  data: exams })
});







//@dec get specific exam by id
//@route GET /api/exams
//@access public
exports.getExam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const exam = await examModel.findById(id);
  if (!exam) {
    return next(new ApiError(`No exam for this id ${id}`, 404));
  }
  res.status(200).json({ data: exam });
});



//@dec update exam
//@route PUT /api/exams
//@access private
exports.updateEexam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const exam = await examModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!exam) {
    return next(new ApiError(`No exam for this id ${id}`, 404));
  }
  res.status(200).json({ data: exam });
});


//@dec delete exam
//@route delete /api/exams
//@access private
exports.deleteExam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const exam = await examModel.findByIdAndDelete(id);
  if (!exam) {
    return next(new ApiError(`No exam for this id ${id}`, 404));
  }
  res.status(204).send();
});