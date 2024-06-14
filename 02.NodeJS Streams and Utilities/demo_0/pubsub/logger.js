const messageBroker = require ('./messageBroker');

messageBroker.subscribe('request', logger);

function logger (message) {
    console.log('Logging: ' + message);
}

module.exports = {
    logger
};