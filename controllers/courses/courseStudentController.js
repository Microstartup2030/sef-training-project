const asyncHandler = require("express-async-handler");
const courseStudentModel = require("../../models/courses/courseStudentModel");
const ApiError = require('../../validation/apiError');



//@dec create courseStudent
//@route POST /api/courseStudents
//@access private
exports.createCourseStudent = asyncHandler(async (req, res) => {
  const courseStudent = await courseStudentModel.create(req.body);
  res.status(201).json({ data: courseStudent });
});
    

//@dec get list of courseStudents
//@route GET /api/courseStudents
//@access public
exports.getCourseStudents = asyncHandler(async (req, res) => {
    const courseStudents = await courseStudentModel.find({})
    res.status(200).json({  data: courseStudents })
});


//@dec get specific courseStudent by id
//@route GET /api/courseStudents
//@access public
exports.getCourseStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const courseStudent = await courseStudentModel.findById(id);
  if (!courseStudent) {
    return next(new ApiError(`No courseStudent for this id ${id}`, 404));
  }
  res.status(200).json({ data: courseStudent });
});

//  // @desc    Get courseStudent index
//  // @route   GET /api/courseStudents/index
//  // @access  private
// exports.getcourseStudentIndex = asyncHandler(async (req, res) => {
//   const courseStudent = await courseStudentModel.countDocuments();
//   res.status(200).json(courseStudent);
// });





//@dec update courseStudent
//@route PUT /api/courseStudents
//@access private
exports.updateCourseStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const courseStudent = await courseStudentModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!courseStudent) {
    return next(new ApiError(`No courseStudent for this id ${id}`, 404));
  }
  res.status(200).json({ data: courseStudent });
});


//@dec delete courseStudent
//@route delete /api/courseStudents
//@access private
exports.deleteCourseStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const courseStudent = await courseStudentModel.findByIdAndDelete(id);
  if (!courseStudent) {
    return next(new ApiError(`No courseStudent for this id ${id}`, 404));
  }
  res.status(204).send();
});