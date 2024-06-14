module.exports = {
    homeController: (req, res) => {
        res.render('home',{ user: 'Lili'});
    },
};