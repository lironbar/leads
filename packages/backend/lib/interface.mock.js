const express = require('express');
const app = express();

const DEFAULT_STATUS_CDOE = 200;
const DEFAULT_DELAY = 0;

app.use((req, res) => {
    let { statusCode, delay } = req.params;

    statusCode = (statusCode && !isNaN(statusCode)) ? statusCode : DEFAULT_STATUS_CDOE;
    delay = (delay && !isNaN(delay) ? delay : DEFAULT_DELAY);

    setTimeout(() => {
        res.status(statusCode);
        res.end();
    }, delay);
});

module.exports = app;