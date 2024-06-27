const { Router } = require('express');
const { getAll, getRecent, getById } = require('../services/stone');


//TODO replace with real router according to exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const stones = await getRecent();

    res.render('home', { stones });
});

homeRouter.get('/stones', async (req, res) => {
    const stones = await getAll();

    res.render('catalog', { stones });
});


homeRouter.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const stone = await getById(id);

    if (!stone) {
        res.render('404');
        return;
    };

    const isAuthor = req.user && req.user?._id == stone.author.toString();
    const hasLiked = Boolean (stone.likedList.find(v => v.toString() == req.user?._id));
    console.log(hasLiked);


    res.render('details', { stone , isAuthor, hasLiked});
});

module.exports = { homeRouter };