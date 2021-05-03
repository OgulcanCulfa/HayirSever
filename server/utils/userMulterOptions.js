const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,"../public/images/users"));
  },
  filename: function (req, file, cb) {
    cb(null,file.size + file.originalname);
  },
});

module.exports = storage;
