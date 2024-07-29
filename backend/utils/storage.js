const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
});

const deleteImage = (path, resp) => {
  let result;
  fs.unlink(path, (err) => {
    if(err){
      resp({
        success: false,
        message: 'Failed to delete Image, reason : '+err
      });
    }else{
      resp({
        success: true,
        message: 'Image deleted Successfully'
      });
    }
  });
};
module.exports = { upload, deleteImage };
