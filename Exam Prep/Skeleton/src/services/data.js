const { Data } = require('../models/Data');
//TODO replace with real data service according to description

//Import dataModel and Create, Edit, Delete and Get


async function getAll () {
    const data = await Data.find().lean();

    return data;
}

async function getById(id) {
    const data = await Data.findById(id).lean();

    return data;
}

async function create (data, authorId) {
    //TODO extract properties from model
    const record = new Data ({
        prop: data.prop,
        author: authorId
    });

    await record.save();

    return record;
}

async function update (id, data, userId) {

    const record = await Data.findById(id);

    if (!record) {
        throw ReferenceError (`Record ${id} not found!`);
    }

    if(record.author.toString() != userId) {
        throw new Error ('Access denied!');
    }

    //TODO replace with real properties

    record.prop = data.prop;
    
    await record.save();

    return record;

}

async function deleteById (id, userId) {
    const record = await Data.findById(id);

    if (!record) {
        throw ReferenceError (`Record ${id} not found!`);
    }

    if(record.author.toString() != userId) {
        throw new Error ('Access denied!');
    }

    await Data.findByIdAndDelete(id);
   
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};