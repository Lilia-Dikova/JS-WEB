const { readFile } = require ('../util');

function addBreed ( req, res) {
    const html = readFile ('./views/addBreed.html');
    res.writeHead (200, [
        'Content-Type', 'text/html'
    ]);
    res.write(html);
    res.end();
}

module.exports = {
    addBreed
};