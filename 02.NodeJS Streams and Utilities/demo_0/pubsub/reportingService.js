const messageBroker = require ('./messageBroker');

messageBroker.subscribe('request',reportingService);

function reportingService (data) {
    console.log('Reporting: ' + data);
}

module.exports = {
    reportingService
};