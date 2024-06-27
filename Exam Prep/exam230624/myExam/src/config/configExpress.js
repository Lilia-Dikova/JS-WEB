const cookieParser = require('cookie-parser');
const express = require('express');
const { session } = require('../middlewears/session');

const secret = 'PleasePassTheExam!!!';

function configExpress(app) {
    app.use(cookieParser(secret));
    app.use(session());

    app.use('/styles', express.static('styles'));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { configExpress };