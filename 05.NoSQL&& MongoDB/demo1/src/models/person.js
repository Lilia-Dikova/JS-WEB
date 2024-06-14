const mongoose = require ('mongoose');

const personSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: true,
        minLength: [2, 'First name must be at least 2 charcters long!'],
        maxLenght: [10, 'Fist name cannot be more than 10 charcters long']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    age: {
        type: Number,
        min: [0, 'Age must be positive number. Current value is {VALUE}'],
        max: 199
    },
    hobbies: {
        type: [String],
        enum: {
            values: ['Sleeping', 'Eating','Napping'],
            message: 'Unacceptable hobby for a  Cat!'
        }
    }

});

personSchema.methods.sayHello = function () {
    return `${this.firstName} says Hello!`;
};

personSchema.virtual('fullName').get (function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (value) {
    const [first, last ] = value.split(' ');
    this.firstName = first;
    this.lastName = last;
});

personSchema.path('firstName').validate (function () {
    return this.firstName.length >= 2 && this.firstName.length <= 10;
}, 'First name must be between 2 and 10 characters long!');

const Person = mongoose.model('Person', personSchema);


module.exports = { Person };