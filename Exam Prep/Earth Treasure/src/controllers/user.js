const { Router } = require('express');
const { isGuest, isUser } = require('../middlewears/guards');
const { register, login } = require('../services/user');
const { createToken } = require('../services/jwt');
const { parseError } = require('../util');
const { body, validationResult } = require('express-validator');

const userRouter = Router();


userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post(
    '/register',
    isGuest(),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Email should be 10 characters long at least'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    body('repass').custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {

        const { email, password, repass } = req.body;


        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }


            const user = await register(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');



        } catch (err) {
            res.render('register', { data: { email }, errors: parseError(err).errors });
        }

    });

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post('/login',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;


        try {

            const user = await login(email, password);

            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });

            res.redirect('/');

        } catch (err) {
            res.render('login', { data: { email }, errors: parseError(err).errors });
        }
    });

userRouter.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

});


module.exports = { userRouter }; 