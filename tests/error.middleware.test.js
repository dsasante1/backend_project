const { expect } = require('chai');
const sinon = require('sinon');
const error = require('../src/middlewares/error.middleware');

// call error
//res.status
describe('error middleware', () => {
  let status; let json; let res; let next; let err; let req;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
    next = sinon.spy();
    err = sinon.spy();
  });

  it('should test route not found error handler', () => {
    error.notFound(req, res);
    expect(next.calledOnce).to.equal(false);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(404);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.equal('Ooops, route not found');
  });

  it('should return status code for app error handler', () => {
    err = { message: 'unrecoverable error has occured', code: 400 };
    error.appErrorHandler(err, req, res, next);
    expect(next.calledOnce).to.equal(false);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(400);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.equal('unrecoverable error has occured');
  });

  it('should return status code 500 for generic errors', () => {
    err = { message: 'Invalid inputs error', code: 500 };
    error.genericErrorHandler(err, req, res, next);
    expect(next.calledOnce).to.equal(false);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(500);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.equal('Invalid inputs error');
  });
});
