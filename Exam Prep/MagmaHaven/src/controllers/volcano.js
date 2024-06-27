const { Router } = require('express');
const { isUser } = require('../middlewears/guards');
const { body, validationResult} = require ('express-validator');
const { parseError } = require('../util');
const { create, getById, update, deleteById, addVote } = require('../services/volcano');


const volcanoRouter = Router();

volcanoRouter.get('/create', isUser(), (req, res) => {
    res.render('create');
});

volcanoRouter.post(
    '/create', 
    isUser(), 
    body('name').trim().isLength({min: 2}).withMessage('The Name should be at least 2 characters'),
    body('location').trim().isLength({min: 3}).withMessage('The Location should be at least 3 characters'),
    body('elevation').trim().isLength({min: 0}).withMessage('The Elevation should be minimum 0'),
    body('lastEruption').trim().isLength({min: 0, max: 2024}).withMessage('The Year of Last Eruption should be between 0 and 2024'),
    body('image').isURL({ require_tld: false, require_protocol: true }).withMessage('The image should start with http:// or https://'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({min: 10}).withMessage('The Description should be a minimum of 10 characters long'),
    
    async (req, res) => {
       const authorId = req.user._id;
       
        try {
            const result = validationResult(req);

            if(result.errors.length) {
                throw result.errors;
            }

            const volcano = await create(req.body, authorId);
            res.redirect('/catalog');

        }catch (err) {
            res.render('create', {data: req.body, errors: parseError(err).errors });

        }

});

volcanoRouter.get('/edit/:id', isUser(), async (req, res) => {

    let volcano;

    try {
        volcano = await getById(req.params.id);

        if (!volcano) {
            res.status(404).render('404');
            return;
        }


    } catch (err) {
        res.render('404');
    }

    const isAuthor = req.user && req.user?._id == volcano.author.toString();

    if (!isAuthor) {
        res.redirect('/login');
        return;
    };

    res.render('edit', { data: volcano });
});

volcanoRouter.post(
    '/edit/:id', 
    isUser(), 
    body('name').trim().isLength({min: 2}).withMessage('The Name should be at least 2 characters'),
    body('location').trim().isLength({min: 3}).withMessage('The Location should be at least 3 characters'),
    body('elevation').trim().isLength({min: 0}).withMessage('The Elevation should be minimum 0'),
    body('lastEruption').trim().isLength({min: 0, max: 2024}).withMessage('The Year of Last Eruption should be between 0 and 2024'),
    body('image').isURL({ require_tld: false, require_protocol: true }).withMessage('The image should start with http:// or https://'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({min: 10}).withMessage('The Description should be a minimum of 10 characters long'),
    
    async (req, res) => {
       const authorId = req.user._id;
       const id = req.params.id;
       
        try {
            const result = validationResult(req);

            if(result.errors.length) {
                throw result.errors;
            }

            const volcano = await update(id,req.body, authorId);
            res.redirect('/catalog/' + id);

        }catch (err) {
            res.render('edit', {data: req.body, errors: parseError(err).errors });

        }

});

volcanoRouter.get('/delete/:id',isUser(), async (req, res)=> {
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

volcanoRouter.get('/vote/:id',isUser(), async (req, res)=> {
    const id = req.params.id;

    try {
        await addVote(id, req.user._id);
        
        res.redirect('/catalog/' + id);
        
    } catch (err) {
        res.render('details', {errors: parseError(err).errors});     
    }
});

module.exports = { volcanoRouter };