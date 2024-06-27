const { Schema, model, Schema: { Types } } = require('mongoose');

const movieSchema = new Schema({
        title: {
                type: String,
                required: [true, 'Title is required!'],
                minLength: [ 5, 'Title must be at least 5 characters long'],
                match: [/^[a-z0-9 ]+$/gi,'Title may only contain English letters, Numbers and Whitespaces'] // english, digits and whitespaces
        },
        genre: {
                type: String,
                required: [true, 'Genre is required!']
        },
        director: {
                type: String,
                required: [true, 'Director is required!']
        },
        year: {
                type: Number,
                required: [true, 'Year needs to be entered!'],
                min: 1878,
                max: 2100
        },
        rating: {
                type: Number,
                required: [true, 'You need to rate the movie!'],
                min: 0,
                max: 5
        },
        description: {
                type: String,
                required: [true, 'Description is required!'],
                minLength: 20,
                maxLength: 1000
        },
        imageURL: {
                type: String,
                required: [true, 'Image is required!'],
                match: /^https?:\/\/.+/
        },
        cast: {
                type: [Types.ObjectId],
                ref: 'Cast',
                default: []
        },
        author: {
                type: Types.ObjectId,
                ref: 'User',
        }
});

const Movie = model('Movie', movieSchema);

module.exports = { Movie };