const { Schema, model, Schema: {Types}} = require ('mongoose');

const castSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Enter name!']
    },
    age: {
        type: Number,
        min: 0,
        max: 255
    },
    born: {
        type: String,
        required: [true, 'Enter date of birth!']
    },
    nameInMovie: {
        type: String,
        required: [true, 'Enter name in Movie!']
    },
    imageURL: {
        type: String,
        required: [true, 'Provide image URL!'],
        match: /^https?:\/\/.+/
    },
    movie: {
        type: Types.ObjectId,
        ref: 'Movie'
    }
});

const Cast = model ('Cast', castSchema);

module.exports = { Cast };