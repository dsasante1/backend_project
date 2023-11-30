/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const moment = require('moment');
const isUrl = require('is-url');
const { responseProvider } = require('../../helper/response');
const adminMiddlewares = require('./admin.middleware');

const checkSignUpApplicantInput = (req, res, next) => {
  try {
    const {
      email, firstname, lastname, password, phonenumber,
    } = req.body;

    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider(res, null, 'provide a valid email', 400);
    }

    if (typeof firstname !== 'string' || !firstname) {
      return responseProvider(res, null, 'provide a valid firstname', 400);
    }

    if (typeof lastname !== 'string' || !lastname) {
      return responseProvider(res, null, 'provide a valid lastname', 400);
    }

    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider(res, null, 'invalid email and password', 400);
    }

    if (typeof parseInt(phonenumber, 10) !== 'number' || phonenumber.length < 10) {
      return responseProvider(res, null, 'provide a valid phone number', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

// check image extensions
function checkImageExtension(imageExtension) {
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];

  if (imageExtension && allowedExtensions.includes(imageExtension)) {
    return true;
  }
  return false;
}

function isDateFormatValid(date) {
  const pattern = /\d{1,2}[/]\d{1,2}[/]\d{4}/;
  return pattern.test(date);
}

function isDateValid(date) {
  const currentYear = moment().year();

  const splitDate = date.split('/');
  const day = parseInt(splitDate[0], 10);
  const month = parseInt(splitDate[1], 10);
  const year = parseInt(splitDate[2], 10);

  if (day > 0 && day < 32) {
    if (month !== 0 && month < 13) {
      if (year <= currentYear) {
        return true;
      }
    }
  }
  return false;
}

// todo: refactor repetive validators
// todo: auto populate email, first, last name

const checkApplicationInput = (req, res, next) => {
  try {
    const {
      // email, firstname,
      // lastname,

      address,
      course,
      university,
      cgpa,
      dob,
    } = req.body;

    if (typeof address !== 'string' || !address) {
      return responseProvider(res, null, 'provide a valid address', 400);
    }

    if (typeof course !== 'string' || !course) {
      return responseProvider(res, null, 'provide a valid course of study', 400);
    }

    if (typeof university !== 'string' || !university) {
      return responseProvider(res, null, 'provide a valid university name', 400);
    }

    if (typeof parseInt(cgpa, 10) !== 'number') {
      return responseProvider(res, null, 'provide a valid cgpa', 400);
    }

    if (!isDateFormatValid(dob) || !isDateValid(dob)) {
      return responseProvider(res, null, 'provide a valid date of birth', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkLoginInput = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider(res, null, 'invalid email and password', 400);
    }

    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider(res, null, 'invalid email and password', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkCreateApplicationInputs = (req, res, next) => {
  try {
    const {
      link, batch_id, closure_date, instructions,
    } = req.body;

    if (!isUrl(link)) {
      return responseProvider(res, null, 'provide a valid url link', 400);
    }

    if (typeof batch_id !== 'number') {
      return responseProvider(res, null, 'provide a valid batch Id', 400);
    }

    if (!isDateFormatValid(closure_date) || !isDateValid(closure_date)) {
      return responseProvider(res, null, 'provide a valid closure date', 400);
    }

    if (typeof instructions !== 'string' || !instructions) {
      return responseProvider(res, null, 'provide valid instructions', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkCreateAssessmentInput = (req, res, next) => {
  try {
    const { batch, question, timer } = req.body;

    if (typeof batch !== 'number') {
      return responseProvider(res, null, 'provide a valid batch Id', 400);
    }

    if (typeof question !== 'object') {
      return responseProvider(res, null, 'provide valid questions', 400);
    }

    if (typeof timer !== 'number') {
      return responseProvider(res, null, 'provide a valid timer', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

// TODO: check if email has @
// check if the email already exists
// check if the application status is one of
// pending, approved, declined

const checkDecisionInput = (req, res, next) => {
  const applicationDecision = ['pending', 'declined', 'approved'];

  try {
    const { email, applicationStatus } = req.body;

    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider(res, null, 'provide a valid email', 400);
    }

    if (!adminMiddlewares.checkIfEmailExists(email)) {
      return responseProvider(res, null, 'applicant does not exist', 400);
    }

    if (!applicationDecision.includes(applicationStatus)) {
      return responseProvider(res, null, 'provide a valid application decision', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkBatchIdInput = (req, res, next) => {
  try {
    const { batch, newBatchId } = req.body;

    if (typeof batch !== 'number' || typeof newBatchId !== 'number') {
      return responseProvider(res, null, 'provide a valid batch Id', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkTimerInput = (req, res, next) => {
  try {
    const { timer } = req.body;

    if (typeof timer !== 'number') {
      return responseProvider(res, null, 'provide a valid timer', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkSignUpApplicantInput,
  checkLoginInput,
  checkApplicationInput,
  checkCreateApplicationInputs,
  checkCreateAssessmentInput,
  checkDecisionInput,
  checkBatchIdInput,
  checkTimerInput,
  checkImageExtension,
  isDateFormatValid,
  isDateValid,
};
