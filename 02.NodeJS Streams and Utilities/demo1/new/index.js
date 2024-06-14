const { pubilsh } = require ('./pub');
const {sub} = require ('./sub');


function start () {
    sub();
    pubilsh();
}

start();