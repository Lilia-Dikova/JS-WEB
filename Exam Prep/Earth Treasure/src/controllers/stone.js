const { Router } = require('express');
const { isUser } = require('../middlewears/guards');
const { create, getById, update, deleteById, likeStone } = require('../services/stone');
const { parseError } = require('../util');
const { body, validationResult } = require('express-validator');
const { Stone } = require('../models/Stone');

const stoneRouter = Router();


stoneRouter.get('/stones/create', isUser(), (req, res) => {
    res.render('create');
});

stoneRouter.post(
    '/stones/create',
    isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name needs to be at least 2 characters long'),
    body('category').trim().isLength({ min: 3 }).withMessage('The category needs to be at least 3 characters long'),
    body('color').trim().isLength({ min: 2 }).withMessage('The color needs to be at least 2 characters long'),
    body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('The formula needs to have between 3 and 30 characters'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('The location needs to have between 5 and 15 characters'),
    body('description').trim().isLength({ min: 15 }).withMessage('The name needs to be at least 15 characters long'),
    body('image').isURL({ require_tld: false, require_protocol: true,require_port: true }).withMessage('The image should start with http:// or https://'),
    async (req, res) => {

        const authorId = req.user._id;

        try {

            console.log(authorId);

            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const stone = await create(req.body, authorId);
            res.redirect('/stones');

        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    });

stoneRouter.get('/stones/edit/:id', isUser(), async (req, res) => {

    let stone;

    try {
        stone = await getById(req.params.id);

        if (!stone) {
            throw new Error('Stone not found');
        }

    } catch (err) {
        res.render('404');
    }

    const isAuthor = req.user && req.user?._id == stone.author.toString();

    if (!isAuthor) {
        res.redirect('/login');
        return;
    };

    res.render('edit', { data: stone });
});

stoneRouter.post(
    '/stones/edit/:id',
    isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name needs to be at least 2 characters long'),
    body('category').trim().isLength({ min: 3 }).withMessage('The category needs to be at least 3 characters long'),
    body('color').trim().isLength({ min: 2 }).withMessage('The color needs to be at least 2 characters long'),
    body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('The formula needs to have between 3 and 30 characters'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('The location needs to have between 5 and 15 characters'),
    body('description').trim().isLength({ min: 15 }).withMessage('The name needs to be at least 15 characters long'),
    body('image').isURL({ require_tld: false, require_protocol: true,require_port: true }).withMessage('The image should start with http:// or https://'),
    async (req, res) => {

        const stoneId = req.params.id;
        const authorId = req.user._id;

        try {

            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const stone = await update(stoneId, req.body, authorId);

            res.redirect('/details/' + stoneId);

        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
        }
    });

stoneRouter.get('/stones/delete/:id', isUser(), async (req, res) => {

    const stoneId = req.params.id;
    const authorId = req.user._id;

    try {
        const result = await deleteById(stoneId, authorId);
        res.redirect('/stones');
    } catch (err) {
        res.redirect('/stones/' + stoneId);
   
    }

});

stoneRouter.get('/like/:id', async (req, res)=> {

    const stoneId = req.params.id;
    const authorId = req.user._id;

    try {
        const result = await likeStone(stoneId, authorId);
        res.redirect('/details/' + stoneId);
    } catch (err) {
        res.redirect('/details/' + stoneId);
   
    }
});


module.exports = { stoneRouter };