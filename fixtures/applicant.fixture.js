// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');

const applicantInfo = {
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.firstName(),
  password: faker.internet.password(),
  phonenumber: '0000000000',
};

module.exports = { applicantInfo };
