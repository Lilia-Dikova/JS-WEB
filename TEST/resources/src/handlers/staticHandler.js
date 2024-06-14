const { readFile } = require('../util');

function staticHandler (req, res) {
    if (req.url.endsWith('.css')) {
        const data = readFile(req.url);
        res.writeHead(200, [
            'Content-Type', 'text/css'
        ]);
        res.write(data);
        res.end();
        return true;

    } else if (req.url.endsWith('.ico')) {
        const data = readFile("content/images/pawprint.ico");
        console.log(data);
        res.writeHead(200, [
            'Content-Type', 'image/png'
        ]);
        res.write(data);
        res.end();
        return true;
    }
    
    else {
        return false;
    }
};

module.exports = {
    staticHandler
};
