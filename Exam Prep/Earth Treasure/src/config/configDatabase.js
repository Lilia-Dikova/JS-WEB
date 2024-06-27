const mongoose = require ('mongoose');

require('../models/User');
require('../models/Stone'); //TODO import real data model


async function configDatabase() {
    //TODO set database name
    const connectionString = 'mongodb://localhost:27017/earth-treasure';

    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };