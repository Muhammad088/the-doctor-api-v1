const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/api_features");
const ApiError = require("../utils/api_error");

exports.getDocuments = (Model) =>
  asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate()
      .filter()
      .search()
      .feilds()
      .sort();
    const documents = await apiFeatures.mongooseQuery.exec();
    res.status(200).json({ results: documents.length, data: documents });
  });

exports.getSpecificDocument = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    if (!doc) return next(new ApiError("No doc for this id", 404));
    res.status(200).json({ data: doc });
  });

exports.createDocument = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ data: doc });
  });

exports.updateDocument = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    // if (req.body.images) {
    //   doc = await Model.findByIdAndUpdate(
    //     id,
    //     { $push: { images: req.body.images } },
    //     { new: true }
    //   );
    // }

    if (!doc) return next(new ApiError("No doc for this id", 404));
    res.status(200).json({ data: doc });
  });

exports.deleteDocument = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) return next(new ApiError("No doc for this id", 404));
    res.status(200).json({ msg: "deleted successfully" });
  });
