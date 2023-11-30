// response provider for middlewares
function responseProvider(res, data, message, code) {
  return res.status(code).json({ message, data });
}

// status  success | failure
// data data from database
// message response to user
// code server status codes
function provideResponse(status, code, message, data) {
  if (!status || typeof code !== 'number' || !message) {
    return 'provide arguments';
  }

  return {
    status,
    code,
    message,
    data,
  };
}

module.exports = {
  responseProvider,
  provideResponse,
};
