const { User} = require ('../models/User');
const bcrypt = require('bcrypt');

async function register (email, password) {
    //check if User Exists
    //hash password
    //create DB record
    //return saved record
    const existing = await User.findOne({email});

    if (existing){
        throw new Error ('Existing user, please login');
    }

    const user = new User ({
        email: email,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();

    return user;
}


async function login ( email, password) {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error ('Incorrect Email or Password');
    }

    const hash = user.password;

    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
        throw new Error ('Invalid Credentials!');
    }

    return user;
};

module.exports = {
    register,
    login
};
