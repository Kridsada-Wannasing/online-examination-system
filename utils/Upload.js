const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("กรุณาใส่รูปภาพ", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${req.user.teacherId}-${file.originalname}`);
  },
});

const Upload = multer({ storage: storage, fileFilter: imageFilter });
module.exports = Upload;
