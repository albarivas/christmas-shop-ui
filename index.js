// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const HOST = process.env.HOST_NAME || 'localhost'; // eslint-disable-line
const PORT = process.env.PORT || 5000; // eslint-disable-line
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:5000'; // eslint-disable-line
const DIST_DIR = './dist';

const app = express();
app.use(helmet());
app.use(compression());
app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy',
        `script-src 'self' ${API_ENDPOINT}`
    );
    return next();
});
app.use(express.static(DIST_DIR));
app.use('/', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});
app.listen(PORT, () =>
    console.log(`✅  UI Server started: http://${HOST}:${PORT}`)
);
