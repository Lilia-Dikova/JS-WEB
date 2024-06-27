const express = require('express');

const { configDatabase } = require('./config/configDatabase');
const { configExpress } = require('./config/configExpress');
const { configHbs } = require('./config/configHbs');
const { configRoutes } = require('./config/configRoutes');

async function start() {
    const app = express();
    await configDatabase();
    configExpress(app);
    configHbs(app);
    configRoutes(app);


    app.listen(3000, () => {
        console.log('Server started http://localhost:3000');
     
    });
}


start();

