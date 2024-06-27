const cookieParser = require('cookie-parser');
const express = require('express');
const { session } = require('../middlewears/session');
const { userRouter } = require('../controllers/user');
const { homeRouter } = require('../controllers/home');
const { catalogRouter } = require('../controllers/catalog');

const secret = 'PleasePassTheExam!!!';

function configExpress(app) {
    app.use(cookieParser(secret));
    app.use(session());
   
    //TODO add session middleware

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { configExpress };