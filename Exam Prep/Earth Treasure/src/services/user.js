const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const identityName = 'email';

async function register(identity, password) {
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This ${identityName} is already in use`);
    }

    const user = new User({
        [identityName]: identity,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();

    return user;
}

async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hash = user.password;

    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
        throw new Error('Incorrect username or password');
    }

    return user;
}

module.exports = {
    register,
    login
};