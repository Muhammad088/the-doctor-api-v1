const multer = require("multer");
const ApiError = require("./api_error");

exports.uploadSingleImage = function (fieldname) {
  /*
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user/");
  },
  filename: (req, file, cb) => {
    const filename = req.body.name;
    const extension = file.mimetype.split("/")[1];
    cb(null, `${filename}.${extension}`);
  },
});
*/

  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("images only allowed", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload.single(fieldname);
};

exports.uploadMultiImages = function (fieldname) {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("images only allowed", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload.array(fieldname, 5);
};
