let count = 0;

function countMiddleware (req, res, next) {
    count ++;
    req.count = count;

    next();
}

module.exports = { countMiddleware };