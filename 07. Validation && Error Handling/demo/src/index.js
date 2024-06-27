const express = require ('express');
const handlebars = require ('express-handlebars');
const { router } = require('./controllers/home');


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(router);

const hbs = handlebars.create ({
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.listen(3000, ()=> console.log('App running on port: 3000'));