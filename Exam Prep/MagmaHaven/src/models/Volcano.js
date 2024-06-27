const { Schema, model, Schema: { Types } } = require('mongoose');

const volcanoSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    elevation: {
        type: Number,
        required: [true, 'Elevation is required'],
    },
    lastEruption: {
        type: Number,
        required: [true, 'Last Eruption is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    typeVolcano: {
        type: String,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        required: [true, 'Volcano Type is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    voteList: {
        type: [Types.ObjectId],
        required: true,
        default: []
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});
                                                                                                                                       
// volcanoSchema.virtual('votes').get(function () {
//     return this.voteList.length;
// });

const Volcano = model('Volcano', volcanoSchema);

module.exports = { Volcano };

