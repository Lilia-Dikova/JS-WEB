const { Router } = require('express');
const { isUser } = require('../middlewears/guards');
const { body, validationResult } = require('express-validator');
const { create, getById, update, deleteById, recommend } = require('../services/recipe');
const { parseError } = require('../util');

const recipeRouter = Router();

recipeRouter.get('/create', isUser(), (req, res) => {
    res.render('create');
});

recipeRouter.post(
    '/create',
    isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('The Title should be at least 2 characters'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('The Description should be between 10 and 100 characters long'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('The Ingredients should be between 10 and 200 characters long'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('The Instuctions should be at least 10 characters long'),
    body('image').isURL({ require_tld: false, require_protocol: true }).withMessage('The image should start with http:// or https://'),

    async (req, res) => {

        const authorId = req.user._id;
        const recipeId = req.params.id;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }
            const recipe = await create(req.body, authorId);
            res.redirect('/catalog');

        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }

    });

recipeRouter.get('/edit/:id', isUser(), async (req, res) => {

    let recipe;

    try {
        recipe = await getById(req.params.id);

        if (!recipe) {
            res.status(404).render('404');
            return;
        }


    } catch (err) {
        res.render('404');
    }

    const isAuthor = req.user && req.user?._id == recipe.author.toString();

    if (!isAuthor) {
        res.redirect('/login');
        return;
    };

    res.render('edit', { data: recipe });
});

recipeRouter.post(
    '/edit/:id',
    isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('The Title should be at least 2 characters'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('The Description should be between 10 and 100 characters long'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('The Ingredients should be between 10 and 200 characters long'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('The Instuctions should be at least 10 characters long'),
    body('image').isURL({ require_tld: false, require_protocol: true }).withMessage('The image should start with http:// or https://'),

    async (req, res) => {

        const authorId = req.user._id;
        const recipeId = req.params.id;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }
            const recipe = await update(recipeId, req.body, authorId);
            res.redirect('/catalog/' + recipeId);

        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
        }

    });

recipeRouter.get('/delete/:id',isUser(), async (req, res) => {

    const id = req.params.id;


    try {
        await deleteById(id, req.user._id);

    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login');
            return;
        }

    }
    res.redirect('/catalog');

});

recipeRouter.get('/recommend/:id',isUser (),async (req, res)=> {
    const id = req.params.id;
    const userId = req.user._id;

    let recipe;

    try {
        await recommend(id, userId);
        res.redirect('/catalog/' + id);

    } catch (err) {
        res.render('details', {errors: parseError(err).errors});     

    }
});



module.exports = { recipeRouter };