const { Schema, model, Schema: { Types } } = require('mongoose');

//TODO replace with data model from exam description

const stoneSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    location: {
        type: String,
        required: [true, 'Prop is required'],
    },
    formula: {
        type: String,
        required: [true, 'Formula is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    likedList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Stone = model('Stone', stoneSchema);

module.exports = { Stone };


