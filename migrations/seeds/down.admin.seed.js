const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { runQuery } = require('../../src/config/database.config');

dotenv.config();

const adminPassword = 'SELECT password FROM admin WHERE email=$1;';

const adminQueryDown = `DELETE FROM
admin WHERE email=$1
RETURNING fullname;`;

// const errorResponse = Error('serious error. contact admin');

const down = async (email, passWord, passwordQuery, deleteQuery) => {
  try {
    const [{ password }] = await runQuery(
      passwordQuery,
      [
        email,
      ],
    );

    const passwordResponse = bcrypt.compareSync(passWord, password);

    if (!passwordResponse) {
      return 'invalid credentials';
    }

    const deleteResponse = await runQuery(
      deleteQuery,
      [
        email,
      ],
    );

    if (deleteResponse) {
      console.log('admin credentials revocked');
    }
    return passwordResponse;
  } catch (error) {
    console.log(error.message);
  }
};

const {
  email,
  password,
} = process.env;

down(
  email,
  password,
  adminPassword,
  adminQueryDown,
);
