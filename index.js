// Import database config
require('./src/config/database.config');

const express = require('express');
// const fileUpload = require('express-fileupload');
// const enforceSSL = require('express-enforces-ssl');
const cors = require('cors');
// const bodyParser = require('body-parser');
const apiVersion1 = require('./src/config/versioning/v1');
const { notFound, appErrorHandler, genericErrorHandler } = require('./src/middlewares/error.middleware');
const envConfig = require('./src/config/env/index');

const app = express();

const PORT = envConfig.APP_PORT || 7006;

// TODO potential wahala
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

app.use('/api/v1', apiVersion1);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

module.exports = app;
