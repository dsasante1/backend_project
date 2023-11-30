const { expect } = require('chai');
const responseHelpers = require('../helper/response');

describe('Testing Response Helpers', () => {
  it('should test response helper', () => {
    const provideResponse = responseHelpers.provideResponse(
      'error',
      200,
      'operation was a success',
      null,

    );

    expect(provideResponse).to.eql({
      status: 'error',
      code: 200,
      message: 'operation was a success',
      data: null,
    });
  });

  it('should test for empty arguments provide response', () => {
    const provideResponse = responseHelpers.provideResponse();
    expect(provideResponse).to.equal('provide arguments');
  });

  it('should test for partial arguments', () => {
    const provideResponse = responseHelpers.provideResponse(400, 'operation failed', null);
    expect(provideResponse).to.equal('provide arguments');
  });
});
