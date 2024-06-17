const { getMovieById, attachCastToMovie } = require('../services/movie');
const { getAllCast } = require('../services/cast');
const cast = require('./cast');

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        const allCast = await getAllCast();
        const castInMovie = movie.cast.map(elem => elem._id.toString());
        console.log(castInMovie);

        res.render('cast-attach', { movie, allCast: allCast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
    },
    attachPost: async (req, res) => {
        const movieId = req.params.id;
        const castId = req.body.cast;
        const userId = req.user._id;

        if (!movieId || !castId) {
            console.error(`Missing ${movieId} or ${castId}`);
            res.status(400).end();
            return;
        }

        if (castId == 'none') {
            const movie = await getMovieById(movieId);
            const allCast = await getAllCast();
            res.render('cast-attach', { movie, allCast, error: true });

            return;
        }

        try {
            await attachCastToMovie(movieId, castId, userId);
        } catch (err) {
            if (err.messsage == 'Access denied!') {
                res.redirect('/login');
            } else {
                console.error('Error adding cast to movie', err);
                res.status(400).end();
            }
            return;
        }

        res.redirect('/details/' + movieId);
    }
};

