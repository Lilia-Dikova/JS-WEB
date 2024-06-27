const { isUser } = require('../middlewares/guards');

const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createGetCast, createPostCast } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { userRouter } = require('../controllers/user');

const { movieRouter } = require('../controllers/movie');



function configRoutes(app) {
    app.get('/', home);
    app.get('/search', search);
    app.get('/details/:id', details);
    
    app.get('/attach/:id', isUser(), attachGet);
    app.post('/attach/:id', isUser(), attachPost);
    
    app.get('/create/cast', isUser(), createGetCast);
    app.post('/create/cast', isUser(), createPostCast);
    
    app.use(userRouter);
    app.use(movieRouter);
    
    app.get('/about', about);
    app.get('*', notFound);

}


module.exports = { configRoutes };