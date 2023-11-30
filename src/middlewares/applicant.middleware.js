/* eslint-disable camelcase */
const { runQuery } = require('../config/database.config');
const applicantQueries = require('../queries/applicant.queries');

const adminQueries = require('../queries/admin.queries');

const cloudinary = require('../../utils/cloudinary');
const { responseProvider } = require('../../helper/response');

// module.exports = ApplicantMiddleware;

async function queryRunner(queries) {
  const result = await runQuery(queries);
  return result;
}

// set applicant batch id
// eslint-disable-next-line max-len
const getCurrentBatchId = async (req, res, next, queries = queryRunner(adminQueries.currentBatch)) => {
  try {
    const [{ batch_id = null }] = await new Promise((resolve) => {
      setTimeout(() => resolve(queries), 700);
    });
    console.log("current batch", batch_id);
    if (!batch_id) {
      return responseProvider(res, null, 'batch id not found', 501);
    }


    req.batch_id = batch_id;
    return next();
  } catch (error) {
    return next(error);
  }
};
// set applicant batch id
function setBatchId(queries = applicantQueries.setApplicantBatchId) {
  return async (req, res, next) => {
    try {
      const { email } = req.body;

      // eslint-disable-next-line prefer-destructuring
      const batch_id = req.batch_id;

      const [setBatch = null] = await runQuery(
        queries,
        [email, batch_id],
      );

      if (!setBatch) {
        return responseProvider(res, null, 'batch id not set', 501);
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}


const fileHandler = async (req, res, next) => {
  // console.log("req", req.files);
  // const { cv } = req.files;
  // console.log("cv->", cv[0].path);
  // console.log("path ->", image[0].path);
  // const { firstname, lastname } = req.body;
  console.log(req.body);
  return next();
};


const getSecureUrl = async (filePath = '') => {
  try {
    console.log("secure url", filePath);
    if (!filePath) {
      throw (Error('invalid file path'));
    }
    const { secure_url } = await cloudinary.uploader.upload(filePath, { use_filename: true, resource_type: 'raw' });

    return secure_url;
  } catch (error) {
    return error;
  }
};

// upload applicant image
const applicantImageUploader = async (req, res, next) => {
  try {
    const { image } = req.files;
    const imagePath = image[0].path;

    const imgUrl = await new Promise((resolve) => {
      setTimeout(() => resolve(getSecureUrl(imagePath)), 900);
    });

    if (!imgUrl || imgUrl instanceof Error) {
      return responseProvider(res, null, 'Cannot upload image, try again!', 400);
    }

    req.imgUrl = imgUrl;

    return next();
  } catch (error) {
    return next(error);
  }
};

// upload applicant cv document
const applicantDocUploader = async (req, res, next) => {
  try {
    const { cv } = req.files;
    const cvPath = cv[0].path;

    const cvUrl = await await new Promise((resolve) => {
      setTimeout(() => resolve(getSecureUrl(cvPath)), 900);
    });

    if (!cvUrl || cvUrl instanceof Error) {
      return responseProvider(res, null, 'Cannot upload cv, try again!', 400);
    }

    req.cvUrl = cvUrl;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  // checkIfIdExists,
  fileHandler,
  getCurrentBatchId,
  applicantImageUploader,
  applicantDocUploader,
  setBatchId,
  getSecureUrl,
};
