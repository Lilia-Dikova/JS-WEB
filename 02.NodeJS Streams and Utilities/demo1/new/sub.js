const { emitter } = require ('./emitter');

function sub () {
    emitter.on('login',onMessage);
}

function onMessage (data) {
    console.log('This is my first emitter', data);
}

module.exports = {
 sub
};