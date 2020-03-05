const cors = require('cors');
const bodyParser = require('body-parser');
const CORS_WHITELIST = require('./constants/frontend');
const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS')),
};
const configureServer = app => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
};
module.exports = configureServer;

// Basically you enable CORS for your application so that your frontend application is able to communicate with your backend application. In addition, you apply the body-parser middleware to parse your incoming requests rather than parsing them yourself. You don't need to bother about this anymore.
