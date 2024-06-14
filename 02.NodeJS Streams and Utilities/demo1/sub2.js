//const { subscribe, unSubscribe } = require ('./bus');

const {emitter} = require('./emitter');

function start () {
    emitter.on ('login',onMessage);
}

function unSub () {
    emitter.off('login', onMessage);
}

function onMessage (data) {
    console.log('Second subscriber receiving message:', data);
}

module.exports = {
    start,
    unSub
};