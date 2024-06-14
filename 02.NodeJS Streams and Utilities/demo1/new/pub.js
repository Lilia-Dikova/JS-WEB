const { emitter } = require ('./emitter');


function pubilsh () {
    const data = 'My cat names are Mimi and Ushe';

    emitter.emit('login', data);
}

module.exports = {
    pubilsh
};