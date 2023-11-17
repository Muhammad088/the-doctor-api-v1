const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const ClinicModel = require("../models/clinic_model");
const factory = require("./handlers_factory");
const { uploadMultiImages } = require("../utils/upload_images");
const ApiError = require("../utils/api_error");

/**
 * @description   upload clinic images
 */
exports.uploadClinicImages = uploadMultiImages("images");

/**
 * @description   resize clinic images
 */
exports.resizeClinicImages = expressAsyncHandler(async (req, res, next) => {
  //   console.log(req.files);
  //   console.log(req.body);
  req.body.images = [];
  await Promise.all(
    req.files.map(async (image, index) => {
      const imageName = `${Date.now()}-${index + 1}`;
      await sharp(image.buffer)
        .resize(400, 400)
        .toFormat("jpeg", { mozjpeg: true })
        .toFile(`uploads/clinic/${imageName}.jpeg`);
      req.body.images.push(`${imageName}.jpeg`); // save image file into db
    })
  );
  console.log(req.body.images);
  next();
});

/**
 * @description   get list of clinics
 * @route         GET  /api/v1/clinics
 * @access        Private
 */
exports.getClinics = factory.getDocuments(ClinicModel);

/**
 * @description   get a specific clinic
 * @route         GET  /api/v1/clinics/:id
 * @access        Public
 */
exports.getClinic = factory.getSpecificDocument(ClinicModel);

/**
 * @description   create clinic
 * @route         POST  /api/v1/clinics
 * @access        Private
 */
exports.createClinic = factory.createDocument(ClinicModel);

/**
 * @description   update a specific clinic
 * @route         PUT  /api/v1/clinics/:id
 * @access        Private
 */
exports.updateClinic = factory.updateDocument(ClinicModel);
exports.updateClinicImages = expressAsyncHandler(async (req, res, next) => {
  if (req.body.images) {
    const { id } = req.params;
    // const doc = await ClinicModel.findOneAndUpdate({ _id: id }, req.body, {
    //   new: true,
    // });
    const doc = await ClinicModel.findByIdAndUpdate(
      id,
      { $push: { images: req.body.images } },
      { new: true }
    );
    if (!doc) return next(new ApiError("No doc for this id", 404));
    res.status(200).json({ data: doc });
  }
});

/**
 * @description   delete a specific clinic
 * @route         DELETE  /api/v1/clinics/:id
 * @access        Private
 */
exports.deleteClinic = factory.deleteDocument(ClinicModel);
