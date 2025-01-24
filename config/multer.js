const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
