const { Router } = require('express');
const { body, validationResult} = require ('express-validator');

const { isGuest } = require('../middlewares/guards');
const { register, login } = require("../services/user");
const { createToken } = require('../services/token');

const { parseError} = require ('../util.js');

const userRouter = Router();


userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post(
    '/register',
    isGuest(),
    body('email').trim().isEmail().isLength({min: 10}).withMessage('Email should be 10 characters long at least'),
    body('password').trim().isLength({ min: 6}).isAlphanumeric().withMessage('Password must be at least 6 characters long and may contain only English letters and numbers!'),
    body('repass').trim().custom((value, {req})=>  value === req.body.password ).withMessage('Passwords don\'t match!'),

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
            res.render('register', { data: { email }, errors: parseError(err).errors});
            return;
        }
    });

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post(
    '/login', 
    body('email').trim().withMessage('Please enter a valid email'),
    body('password').trim().withMessage('Please enter a password'),
    isGuest(), async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('All Fields are required');
        }

        const user = await login(email, password);

        const token = createToken(user);

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.render('login', { data: { email }, error: err.message });
        return;
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = { userRouter };

