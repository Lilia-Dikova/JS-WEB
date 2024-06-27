const { Stone } = require('../models/Stone');

//Import dataModel and Create, Edit, Delete and Get


async function getAll () {
    const data = await Stone.find().lean();

    return data;
}
async function getRecent () {
    return Stone.find().sort({ $natural: -1}).lean();
}


async function getById(id) {
    const data = await Stone.findById(id).lean();

    return data;
}

async function create (data, authorId) {

    const record = new Stone ({
        name: data.name,
        category: data.category,
        color: data.color,
        image: data.image,
        location: data.location,
        formula: data.formula,
        description:data.description,
        author: authorId
    });

    await record.save();

    return record;
}

async function update (id, data, userId) {

    const record = await Stone.findById(id);

    if (!record) {
        throw ReferenceError (`Record ${id} not found!`);
    }

    if(record.author.toString() != userId) {
        throw new Error ('Access denied!');
    }

        record.name =  data.name;
        record.category = data.category;
        record.color = data.color;
        record.image = data.image;
        record.location = data.location;
        record.formula = data.formula;
        record.description = data.description;
    
    await record.save();

    return record;

}

async function deleteById (id, userId) {
    const record = await Stone.findById(id);

    if (!record) {
        throw ReferenceError (`Record ${id} not found!`);
    }

    if(record.author.toString() != userId) {
        throw new Error ('Access denied!');
    }

    await Stone.findByIdAndDelete(id);
   
}

async function likeStone (id, userId) {
    const record = await Stone.findById(id);

    if (!record) {
        throw ReferenceError (`Record ${id} not found!`);
    }
    
    if(record.author.toString() == userId) {
        throw new Error ('Access denied!');
    }

    if (Boolean(record.likedList.find(c => c.toString() == userId)) ){
        return;
    }
    record.likedList.push(userId);

    await record.save();
    return record;


}
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getRecent,
    likeStone
};