const jwt = require('jsonwebtoken');

const config = require('../config/env/index');

const SECRET = config.JWT_SECRET_KEY;

const checkToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log("authorization", authorization);
    if (!authorization) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'You are not logged in!',
        data: null,
      });
    }

    // const token = authorization.split(' ')[1];
    // const applicant = jwt.verify(token, SECRET);

    const applicant = jwt.verify(authorization, SECRET);

    if (!applicant) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'You are not authorized to make this request!',
        data: null,
      });
    }
    req.applicant = applicant;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkToken,
};
