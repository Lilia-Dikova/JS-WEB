
const http = require('http');

const { homeHandler } = require('./handlers/home');

const routes = {
    '/': homeHandler,
    '/index.html': homeHandler
};

http.createServer((req ,res) => {
    const route = routes[req.url];

    if (typeof route == 'function') {
        route(req,res);
        return;

    } else {
        res.writeHead(404, [
            'Content-type' , 'text/plain'
        ]);
        res.write('404 Not Found');
        res.end();
    }
}).listen(3000);