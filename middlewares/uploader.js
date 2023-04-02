const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.random() * 1e9;
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg image"));
    }
  },
  limits: {
    fileSize: 1000000,
  },
});

module.exports = uploader;
