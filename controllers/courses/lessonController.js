const asyncHandler = require("express-async-handler");
const lessonModel = require("../../models/courses/lessonModel");
const ApiError = require('../../validation/apiError');



//@dec create lesson
//@route POST /api/lessons
//@access private
exports.createLesson = asyncHandler(async (req, res) => {
  const lesson = await lessonModel.create(req.body);
  res.status(201).json({ data: lesson });
});
    

//@dec get list of lessons
//@route GET /api/lessons
//@access public
exports.getLessons = asyncHandler(async (req, res) => {
    const lessons = await lessonModel.find({})
    res.status(200).json({  data: lessons })
});


//@dec get specific lesson by id
//@route GET /api/lessons
//@access public
exports.getLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await lessonModel.findById(id);
  if (!lesson) {
    return next(new ApiError(`No lesson for this id ${id}`, 404));
  }
  res.status(200).json({ data: lesson });
});

//  // @desc    Get lesson index
//  // @route   GET /api/lessons/index
//  // @access  private
// exports.getlessonIndex = asyncHandler(async (req, res) => {
//   const lesson = await lessonModel.countDocuments();
//   res.status(200).json(lesson);
// });





//@dec update lesson
//@route PUT /api/lessons
//@access private
exports.updateLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await lessonModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!lesson) {
    return next(new ApiError(`No lesson for this id ${id}`, 404));
  }
  res.status(200).json({ data: lesson });
});


//@dec delete lesson
//@route delete /api/lessons
//@access private
exports.deleteLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await lessonModel.findByIdAndDelete(id);
  if (!lesson) {
    return next(new ApiError(`No lesson for this id ${id}`, 404));
  }
  res.status(204).send();
});