const asyncHandler = require("express-async-handler");
const certificateModel = require("../../models/courses/certificateModel");
const ApiError = require('../../validation/apiError');



//@dec create certificate
//@route POST /api/certificates
//@access private
exports.createCertificate = asyncHandler(async (req, res) => {
  const certificate = await certificateModel.create(req.body);
  res.status(201).json({ data: certificate });
});
    








//@dec update certificate
//@route PUT /api/certificates
//@access private
exports.updateCertificate = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const certificate = await certificateModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!certificate) {
    return next(new ApiError(`No certificate for this id ${id}`, 404));
  }
  res.status(200).json({ data: certificate });
});


