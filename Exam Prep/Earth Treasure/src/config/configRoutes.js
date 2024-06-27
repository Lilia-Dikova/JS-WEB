//TODO import routers


const { homeRouter } = require('../controllers/home');
const { stoneRouter } = require('../controllers/stone');
const { userRouter } = require('../controllers/user');
const { notFound } = require('../controllers/404');

function configRoutes(app) {
    //TODO register routers
    app.use(homeRouter);
    app.use( userRouter );
    app.use(stoneRouter);

    app.get('*', notFound);
}

module.exports = { configRoutes };
