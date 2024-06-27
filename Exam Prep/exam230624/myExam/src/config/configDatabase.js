const mongoose = require ('mongoose');

require('../models/User');
require('../models/Recipe'); 


async function configDatabase() {
    const connectionString = 'mongodb://localhost:27017/regular-exam';

    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };