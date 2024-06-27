const { Router } = require('express');
const { login, register } = require('../services/user');
const { createToken } = require('../services/jwt');
const { isGuest } = require('../middlewears/guards');

const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');

const userRouter = Router();

userRouter.get('/register', isGuest(), async (req, res) => {
    res.render('register');
});

userRouter.post(
    '/register',
    isGuest(),
    body('username').trim().isLength({ min: 2 }).withMessage('The username should be at least 2 characters long'),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('The email should be at least 10 characters long'),
    body('password').trim().isLength({ min: 4 }).withMessage('The password should be at least 4 characters long'),
    body('repass').custom((value, { req }) => value === req.body.password).withMessage('The repeat password should be equal to the password'),

    async (req, res) => {

        const { username, email, password, repass } = req.body;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }
            const user = await register(username, email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');



        } catch (err) {
            res.render('register', { data: { email, username }, errors: parseError(err).errors });
        }
    });

userRouter.get('/login', isGuest(), async (req, res) => {
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

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = { userRouter };