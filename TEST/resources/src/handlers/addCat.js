const { readFile } = require ('../util');

function addCat (req, res) {
    const html = readFile('./views/addCat.html');

    res.writeHead(200, [
        'Content-type', 'text/html'
    ]); 
    res.write(html);
    res.end();
}

module.exports = {
    addCat
};