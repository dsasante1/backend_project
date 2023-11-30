/* eslint-disable consistent-return */
const applicantQuery = require('../queries/applicant.queries');
const applicantService = require('../services/applicant.service');

// Controller creating a new applicant
function createApplicant(service = applicantService, query = applicantQuery) {
  return async (req, res, next) => {
    try {
      const response = await service.createApplicant(req.body, query);

      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  };
}

// Login controller

function signInApplicant(service = applicantService, query = applicantQuery) {
  return async (req, res, next) => {
    try {
      const result = await service.loginApplicant(req.body, query);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  };
}

// upload applicant image src to database
function applicantImageDb(service = applicantService, query = applicantQuery) {
  return async (req, res, next) => {
    try {
      const { email } = req.body;

      const imageUrl = req.imgUrl;

      await service.setApplicantImageDb(imageUrl, email, query);

      // return res.status(result.code).json(result);
      return next();
    } catch (error) {
      next(error);
    }
  };
}

// Upload doc url to database
function applicantDocDb(service = applicantService, query = applicantQuery) {
  return async (req, res, next) => {
    try {
      const { email } = req.body;

      const { cvUrl } = req;

      await service.setApplicantDocDb(cvUrl, email, query);

      return next();
    } catch (error) {
      next(error);
    }
  };
}

// Upload applicant details to database
function applicantDetailsDb(service = applicantService, query = applicantQuery) {
  return async (req, res, next) => {
    try {
      const response = await service.setApplicantDetailsDb(req.body, query);

      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  createApplicant,
  signInApplicant,
  applicantImageDb,
  applicantDocDb,
  applicantDetailsDb,
};
