//const { publish } = require ('./bus');
const { emitter } = require('./emitter');

function start () {
    const data = [1,2,3];

    emitter.emit('ping', data);
    emitter.emit('login', {
        user:'Peter',
        password: '123'
    });

}

module.exports = {
    start
};