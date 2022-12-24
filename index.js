/* eslint-disable  */
require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const logger = require('winston');
const path = require('path');

const PORT = process.env.SERVER_PORT || 3000;
// const ENV = process.env.environmentType;

const app = express();


// 🚨WARNING: Please do NOT include any secrets/API keys below! These vars get
// sent to the client's browser and will be visible to the end user!
const serverVars = [
  'apiBaseUrl'
];

const config = {};

for (const value of serverVars) {
  config[value] = process.env[value];
}

app.use(express.static('public'));

// https://helmetjs.github.io/
app.use(helmet.frameguard({ action: 'deny' }));

// Disable "X-Powered-By: Express" HTTP header
app.disable('x-powered-by');

app.listen(PORT, () => {
  logger.info(`listening on ${PORT}`);
});

// Setting views path is required to be able to vend index.ejs and related assets/icons
app.set('views', path.join(__dirname, './public'));
app.get('/_healthz', (req, res) => res.status(200).send());
app.get('/_readyz', (req, res) => res.status(200).send());

// Returns Starfleet React app
app.get('*', (_req, res) => {
  res.render('index.ejs', { serverVars, config });
});
