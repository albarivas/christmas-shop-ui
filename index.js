// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const HOST = process.env.HOST_NAME || 'localhost'; // eslint-disable-line
const PORT = process.env.PORT || 3001; // eslint-disable-line
const DIST_DIR = './dist';

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.static(DIST_DIR));
app.set('view engine', 'ejs');
app.use('/', (req, res) => {
    res.render(path.resolve(DIST_DIR, 'index.ejs'), {
        api_endpoint: process.env.API_ENDPOINT // eslint-disable-line
    });
});
app.listen(PORT, () =>
    console.log(`✅  UI Server started: http://${HOST}:${PORT}`)
);
