const asyncHandler = require("express-async-handler");
const courseModel = require("../../models/courses/courseModel");
const {
  validateCreateCourse,
  validateUpdateCourse,
} = require("../../validation/courseValidate");
const slugify = require('slugify')
const ApiError = require('../../validation/apiError');

//@dec create course
//@route POST /api/courses
//@access private
exports.createCourse = asyncHandler(async (req, res) => {
  const { error } = validateCreateCourse(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body.slug = slugify(req.body.title);
  const course = await courseModel.create(req.body 
    
  );
  res.status(201).json({ data: course });
});
    

//@dec get list of courses
//@route GET /api/courses
//@access public
exports.getCourses = asyncHandler(async (req, res) => {
    const courses = await courseModel.find({})
    res.status(200).json({  data: courses })
});


//@dec get specific course by id
//@route GET /api/courses
//@access public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await courseModel.findById(id);
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(200).json({ data: course });
});

 // @desc    Get course index
 // @route   GET /api/courses/index
 // @access  private
exports.getCourseIndex = asyncHandler(async (req, res) => {
  const course = await courseModel.countDocuments();
  res.status(200).json(course);
});





//@dec update course
//@route PUT /api/courses
//@access private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const { error } = validateUpdateCourse(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id } = req.params;
  const course = await courseModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(200).json({ data: course });
});


//@dec delete course
//@route delete /api/courses
//@access private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await courseModel.findByIdAndDelete(id);
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(204).send();
});








