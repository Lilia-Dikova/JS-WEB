const { Volcano } = require('../models/Volcano');

async function getAll() {
    const data = await Volcano.find().lean();

    return data;
}

async function getById(id) {
    const data = await Volcano.findById(id).lean();

    return data;
}

async function create(data, authorId) {
    const record = new Volcano({
        name: data.name,
        location: data.location,
        elevation: data.elevation,
        lastEruption: data.lastEruption,
        image: data.image,
        typeVolcano: data.typeVolcano,
        description: data.description,
        author: authorId
    });

    await record.save();

    return record;
}

async function update(id, data, userId) {

    const record = await Volcano.findById(id);

    if (!record) {
        throw ReferenceError(`Record ${id} not found!`);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied!');
    }

    record.name = data.name;
    record.location = data.location;
    record.elevation = data.elevation;
    record.lastEruption = data.lastEruption;
    record.image = data.image;
    record.typeVolcano = data.typeVolcano;
    record.description = data.description;


    await record.save();

    return record;

}



async function deleteById(id, userId) {
    const record = await Volcano.findById(id);

    if (!record) {
        throw ReferenceError(`Record ${id} not found!`);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied!');
    }

    await Volcano.findByIdAndDelete(id);

}

async function addVote (id, userId) {
    const record = await Volcano.findById(id);

    if (!record) {
        throw new ReferenceError ('Record not found' + id);
    }

    if (record.author.toString() == userId) {
        throw new Error ('Cannot vote for your own publication');
    }

    if (Boolean(record.voteList.find(v => v.toString() == userId) )) {
        throw new Error ('You can vote once for each publication');
    }

        record.voteList.push(userId);

        record.save();

        return record;

}

async function searchVolcanoes (name, typeVolcano) {
    const query = {};

    if (name) {
        query.name = new RegExp(name, 'i');

    }
    if (typeVolcano && typeVolcano != '---') {
        query.typeVolcano = typeVolcano;
    }

    return Volcano.find(query).lean();


}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    addVote,
    searchVolcanoes
};