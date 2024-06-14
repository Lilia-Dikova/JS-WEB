const express = require('express');
const path = require ('path');
const { countMiddleware} = require('./middlewares/counter');
const { dataController } = require('./data');

const app = express();

const homeHtml = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/style.css">
    <title>Document</title>
</head>
<body>
    <h1>Home Page </h1>
    <a href ="/">Home</a>
    <a href ="/catalog">Catalog</a>
    <img src="/static/Cat.jpeg">
</body>
</html>
`;

console.log(__dirname);

const catalogHtml = `
<h2>Catalog Page </h2>
<a href ="/">Home</a>
<a href ="/catalog">Catalog</a>
`;

app.get('/', (req, res) => {
    res.send(homeHtml);
});

// app.get('/static/style.css', (req,res) => {
//     res.sendFile(path.join(__dirname,'../', './static/style.css'));
// });


app.use('/static', express.static('static'));

app.get('/catalog', (req, res) => {
    res.send(catalogHtml);
});

app.get('/catalog/:productID', (req, res) => {
    console.log(req.params.productID);
    res.send(catalogHtml +`<p1>Item ID ${req.params.productID}</p1>`);
});
app.get('/catalog/:category/:productID', (req, res) => {
    console.log(req.params.productID);
    res.send(catalogHtml +`<h2>Category ${req.params.category}</h21>` + `<p1>Item ID ${req.params.productID}</p1>`);
});


app.get('/about/old', (req, res) => {
    res.redirect('/about');
});

app.get('/data', countMiddleware, dataController);

app.all ('*', (req, res) => {
    res.status (404);
    res.send('404 Not Found!');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});