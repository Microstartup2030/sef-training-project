const asyncHandler = require("express-async-handler");
const questionModel = require("../../models/courses/questionModel");
const ApiError = require('../../validation/apiError');



//@dec create question
//@route POST /api/questions
//@access private
exports.createQuestion = asyncHandler(async (req, res) => {
  const question = await questionModel.create(req.body);
  res.status(201).json({ data: question });
});
    

//@dec get list of questions
//@route GET /api/questions
//@access public
exports.getQuestions = asyncHandler(async (req, res) => {
    const questions = await questionModel.find({})
    res.status(200).json({  data: questions })
});


//@dec get specific question by id
//@route GET /api/questions
//@access public
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const question = await questionModel.findById(id);
  if (!question) {
    return next(new ApiError(`No question for this id ${id}`, 404));
  }
  res.status(200).json({ data: question });
});



//@dec update question
//@route PUT /api/questions
//@access private
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const question = await questionModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!question) {
    return next(new ApiError(`No question for this id ${id}`, 404));
  }
  res.status(200).json({ data: question });
});


//@dec delete question
//@route delete /api/questions
//@access private
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const question = await questionModel.findByIdAndDelete(id);
  if (!question) {
    return next(new ApiError(`No question for this id ${id}`, 404));
  }
  res.status(204).send();
});