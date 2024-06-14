const { start: startSubscriber} = require ('./subscriber');
const { start: startSubscriber2, unSub} = require ('./sub2');
const { start: startPublisher} = require ('./publisher');

function start () {
    startSubscriber();
    startSubscriber2();
    startPublisher();
    
    unSub();

    startPublisher();


}

start();