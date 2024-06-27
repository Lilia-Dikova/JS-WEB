const { Schema, model, Schema: { Types } } = require('mongoose');


//TODO add change properties depending on exam description

const userSchema = new Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
},
{
    collation: {
        locale: 'en',
        strength: 2
    }
}
);

const User = model('User', userSchema);

module.exports = { User };