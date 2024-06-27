const { Router } = require('express');
const { getAll, getById, searchVolcanoes } = require('../services/volcano');

const catalogRouter = Router();

catalogRouter.get('/catalog', async (req, res) => {
    const volcanoes = await getAll();

    res.render('catalog', { volcanoes });
});


catalogRouter.get('/catalog/:id', async (req, res) => {

    const id = req.params.id;

    const volcano = await getById(id);

    if (!volcano) {
        res.render('404');
        return;
    }

    const votes = volcano.voteList.length;

    const isAuthor = req.user && req.user?._id == volcano.author.toString();

    const hasVoted = Boolean(volcano.voteList.find(v => v.toString() == req.user?._id));

    res.render('details', { volcano, votes, isAuthor, hasVoted });
});

catalogRouter.get('/search', async (req, res) => {
    const { name, typeVolcano } = req.query;

    const volcanoes = await searchVolcanoes(name, typeVolcano);

    res.render('search', { data: { name, typeVolcano }, volcanoes });
});


module.exports = { catalogRouter };