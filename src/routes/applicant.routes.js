const express = require('express');

const multer = require('multer');
// const fileUpload = require('express-fileupload');
const path = require('path');
// const fileStorage = multer.memoryStorage();

// const upload = multer({ storage: fileStorage });

const router = express.Router();
const { checkToken } = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');
const applicantMiddleware = require('../middlewares/applicant.middleware');

// const { imgUpload, pdfUpload } = require("../../utils/multer");

// const { imgUpload } = require("../../utils/multer");

const applicantControllers = require('../controllers/applicant.controllers');

// signup route
router.post('/signup', validator.checkSignUpApplicantInput, applicantControllers.createApplicant());

// login route
router.post('/login', validator.checkLoginInput, applicantControllers.signInApplicant());

// application input route
// TODO filter file by extension
// limit file size
const storage = multer.diskStorage({

  destination: path.join(__dirname, '/uploads'),
  filename(req, file, cb) {
    const name = `${Date.now()} - ${file.fieldname}`;
    cb(null, name);
  },

});

// const upload = multer({ dest: 'uploads/' });

const upload = multer({storage: storage }).fields(
  [
    { name: 'cv', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ],
);


router.post(
  '/upload',
  checkToken,
  upload,
  // applicantMiddleware.fileHandler,
  validator.checkApplicationInput,
  applicantMiddleware.getCurrentBatchId,
  applicantMiddleware.setBatchId(),
  applicantMiddleware.applicantImageUploader,
  applicantControllers.applicantImageDb(),
  applicantMiddleware.applicantDocUploader,
  applicantControllers.applicantDocDb(),
  applicantControllers.applicantDetailsDb(),
);

module.exports = router;
