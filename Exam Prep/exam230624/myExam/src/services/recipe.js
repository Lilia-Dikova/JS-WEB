const { Recipe } = require('../models/Recipe');


//Import dataModel and Create, Edit, Delete and Get


async function getAll() {
    const data = await Recipe.find().lean();

    return data;
}

async function getById(id) {
    const data = await Recipe.findById(id).lean();

    return data;
}

async function getRecent() {
    return Recipe.find().sort({ $natural: -1 }).limit(3).lean();
}

async function create(data, authorId) {

    const record = new Recipe({
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        description: data.description,
        image: data.image,
        author: authorId
    });

    await record.save();

    return record;
}

async function update(id, data, userId) {

    const record = await Recipe.findById(id);

    if (!record) {
        throw ReferenceError(`Record ${id} not found!`);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied!');
    }

    record.title = data.title;
    record.ingredients = data.ingredients;
    record.instructions = data.instructions;
    record.description = data.description;
    record.image = data.image;


    await record.save();

    return record;

}

async function deleteById(id, userId) {
    const record = await Recipe.findById(id);

    if (!record) {
        throw ReferenceError(`Record ${id} not found!`);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied!');
    }

    await Recipe.findByIdAndDelete(id);

}

async function recommend(id, userId) {
    const record = await Recipe.findById(id);


    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }
    if (record.author.toString() == userId) {
        throw new Error('Cannot recommend your own publication');
    }
    if (Boolean(record.recommendList.find(v => v.toString() == userId))) {
        throw new Error('You can recommend a recepie once');
    }

    record.recommendList.push(userId);

    await record.save();

    return record;


}

async function searchRecipe (title) {
    const query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }
    return Recipe.find(query).lean();
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getRecent,
    recommend,
    searchRecipe
};