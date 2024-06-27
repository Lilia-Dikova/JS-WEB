const { Schema, model, Schema: { Types } } = require('mongoose');


//TODO replace with data model from exam description

const dataSchema = new Schema({

    prop: {
        type: String,
        required: [true, 'Prop is required'],
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Data = model('Data', dataSchema);

module.exports = { Data };
