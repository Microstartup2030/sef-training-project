const asyncHandler = require("express-async-handler");
const reviewModel = require("../../models/courses/reviewModel");
const ApiError = require('../../validation/apiError');
const courseModel = require("../../models/courses/courseModel");



//@dec create review
//@route POST /api/reviews
//@access private
exports.createReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.create(req.body);
  res.status(201).json({ data: review });
});
    

//@dec get list of reviews
//@route GET /api/reviews
//@access public
exports.getReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewModel.find({})
    res.status(200).json({  data: reviews })
});


//@dec get specific review by id
//@route GET /api/reviews
//@access public
exports.getReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findById(id);
  if (!review) {
    return next(new ApiError(`No review for this id ${id}`, 404));
  }
  res.status(200).json({ data: review });
});

//  // @desc    Get review index
//  // @route   GET /api/reviews/index
//  // @access  private
// exports.getreviewIndex = asyncHandler(async (req, res) => {
//   const review = await reviewModel.countDocuments();
//   res.status(200).json(review);
// });





//@dec update review
//@route PUT /api/reviews
//@access private
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!review) {
    return next(new ApiError(`No review for this id ${id}`, 404));
  }
  res.status(200).json({ data: review });
});


//@dec delete review
//@route delete /api/reviews
//@access private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findByIdAndDelete(id);
  if (!review) {
    return next(new ApiError(`No review for this id ${id}`, 404));
  }
  res.status(204).send();
});





