'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const exphb = require('express-handlebars');
const helpers = require('handlebars-helpers');

const routes = require('./routes');
const path = require('path');

const app = express();
const hbConfig = {
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: helpers()
};
const rootDir = path.resolve(__dirname, '../');

// configure handlebars as view engine
app.engine('.hbs', exphb(hbConfig));
app.set('view engine', '.hbs');

// middleware
app.use('/bootstrap', express.static(rootDir + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(rootDir + '/node_modules/jquery/dist'));
app.use('/bootstrap-slider', express.static(rootDir + '/node_modules/bootstrap-slider/dist'));
app.use(express.static(rootDir + '/public'));
app.use(bodyParser.json());

app.use((req, resp, next) => {
    let now = new Date().toDateString();
    let logEntry = `${now} : ${req.method} ${req.url}`;
    if (Object.keys(req.body).length > 0) {
        logEntry += ` params: ${JSON.stringify(req.body)}`;
    }
    console.log(logEntry);
    next();
});
// routes
app.use('/', routes);

module.exports = app;