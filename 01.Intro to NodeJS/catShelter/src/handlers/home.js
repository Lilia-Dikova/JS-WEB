const { readFile } = require('../util');

function homeHandler (req, res) {
    const html = readFile('./views/home/index.html');
    res.writeHead(200, [
        'Content-type' , 'text/html'
    ]);
    res.write(html);
    res.end();
};

module.exports = {
    homeHandler
};

