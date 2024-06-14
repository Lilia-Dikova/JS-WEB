const path = require('path');
const http = require('http');
const { homePage } = require ('./handlers/home');
const { staticHandler } = require('./handlers/staticHandler');
const { addCat } = require('./handlers/addCat');
const { addBreed } = require('./handlers/addBreed');


const routes = {
    '/': homePage,
    '/index.html': homePage,
    '/cats/add-cat': addCat,
    '/cats/add-breed': addBreed
};


http.createServer((req, res) => {
    const route = routes[req.url];

    if (typeof route == 'function') {
        route(req,res);
        return;
    } else if (staticHandler) {
        staticHandler(req,res);
        return;
    } else {
        res.writeHead (404, [
            'Content-type', 'text/plain'
        ]);
        res.write('Not Found');
        res.end();
    }

}).listen(3000);