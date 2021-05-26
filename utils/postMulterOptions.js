const multer = require("multer");
const path = require("path");


module.exports = (location) => {
  const image = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,`../public/images/${location}`));
  },
  filename: function (req, file, cb) {
    cb(null,req.body.text.substr(0,5) + file.originalname);
  },
});
return image
}
