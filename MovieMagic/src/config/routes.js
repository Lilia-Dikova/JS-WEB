const { Router } = require ('express');

const { isGuest, isUser} = require('../middlewares/guards');

const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createGet, createPost, editGet, editPost, deletePost, deletGet } = require('../controllers/movie');
const { createGetCast, createPostCast } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { registerGet, registerPost, loginGet, loginPost, logOut } = require('../controllers/user');


const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/search', search);

router.get('/details/:id', details);
router.get('/attach/:id',isUser(), attachGet);
router.post('/attach/:id',isUser(), attachPost);
router.get('/edit/:id',isUser(), editGet);
router.post('/edit/:id',isUser(), editPost);
router.get('/delete/:id',isUser(), deletGet);
router.post('/delete/:id',isUser(), deletePost);

router.get('/create/movie',isUser(), createGet);
router.post('/create/movie',isUser(), createPost);
router.get('/create/cast',isUser(), createGetCast);
router.post('/create/cast',isUser(), createPostCast);



router.get('/register',isGuest(), registerGet);
router.post('/register',isGuest(), registerPost);
router.get('/login',isGuest(), loginGet);
router.post('/login',isGuest(), loginPost);
router.get('/logout',logOut);




router.get('*', notFound);

module.exports = { router };