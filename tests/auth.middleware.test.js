const { expect } = require('chai');
const sinon = require('sinon');
const auth = require('../src/middlewares/auth.middleware');

describe('authentication middleware', () => {
  let status; let json; let res; let next;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
    next = sinon.spy();
  });

  it('should test no authorization in headers', () => {
    const req = { headers: { authorization: '' } };
    auth.checkToken(req, res, next);
    expect(next.calledOnce).to.equal(false);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(401);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.equal('You are not logged in!');
  });

//   it('should test failed authorization', () => {
//     const req = { headers: { authorization: '' } };
//     auth.checkToken(req, res, next);
//     expect(next.calledOnce).to.equal(false);
//     expect(status.calledOnce).to.be.true;
//     expect(status.args[0][0]).to.equal(401);
//     expect(json.calledOnce).to.be.true;
//     expect(json.args[0][0].message).to.equal('You are not logged in!');
//   });


//   it('should call next for valid authorization', () => {
//     const req = { headers: { authorization: '' } };
//     auth.checkToken(req, res, next);
//     expect(next.calledOnce).to.equal(true);
//   });
});
