//TODO import routers

const { catalogRouter } = require('../controllers/catalog');
const { homeRouter } = require('../controllers/home');
const { notFound } = require('../controllers/notFound');
const { userRouter } = require('../controllers/user');
const { volcanoRouter } = require('../controllers/volcano');

function configRoutes(app) {
    //TODO register routers
    app.use(homeRouter);
    app.use(userRouter);
    app.use(catalogRouter);
    app.use(volcanoRouter);


    app.get('*', notFound);
}

module.exports = { configRoutes };


