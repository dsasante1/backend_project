const express = require('express');

const router = express.Router();

const adminControllers = require('../controllers/admin.controllers');
const adminMiddlewares = require('../middlewares/admin.middleware');
const adminValidator = require('../middlewares/validation.middleware');
const validator = require('../middlewares/validation.middleware');
const { checkToken } = require('../middlewares/auth.middleware');


// login route
router.post(
  '/login',
  validator.checkLoginInput,
  adminControllers.signInAdmin,
);

router.post(
  '/application',
  checkToken,
  adminValidator.checkCreateApplicationInputs,
  adminMiddlewares.changeDateFormat,
  adminMiddlewares.checkBatchIdDuplicate,
  adminControllers.createApplication,
);

router.post(
  '/exam',
  checkToken,
  adminValidator.checkCreateAssessmentInput,
  adminMiddlewares.checkBatchIdExistence,
  adminMiddlewares.checkAssessmentBatchId,
  adminControllers.createAssessment,
);

// approve or decline student application
router.put(
  '/approve',
  checkToken,
  adminValidator.checkDecisionInput,
  adminControllers.approveDeclineApplication,
);

router.get('/dashboard', checkToken, adminControllers.applicationDashboard);
router.get('/entries', checkToken, adminControllers.applicantEntries);
router.get('/history', checkToken, adminControllers.assessmentHistory);
router.get('/results', checkToken, adminControllers.applicantsResults);

// TODO update all old batches to new batches in all tables
router.put(
  '/batch',
  checkToken,
  adminValidator.checkBatchIdInput,
  adminMiddlewares.checkBatchIdExistence,
  adminMiddlewares.checkNewBatchId,
  adminControllers.editBatchId,
);

// TODO the batch checker should check
router.put(
  '/timer',
  checkToken,
  adminValidator.checkTimerInput,
  adminMiddlewares.checkBatchIdExistence,
  adminControllers.editTimer,
);

module.exports = router;
