const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jsonwebtoken = require ('jsonwebtoken');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = {};
const sercretKey = 'jasbiuwb238yrwe.e.,2h8ge';

app.get('/', (req, res) => {
    const token = req.cookies['auth'];

    if (!token) {
        return res.send('Please login!');
    }
    try {
        const decodedToken = jsonwebtoken.verify(token, sercretKey);
        res.send(`Welcome ${decodedToken['username']}!`);
    } catch (err) {
        res.status(403).end();
    }
});


app.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="POST">
        <label>Username</label>
        <input type="text" name="username"/>
        <label>Password</label>
        <input type="password" name="password"/>
        <input type="submit" value="Login">
    </form>
        `);
});

app.get('/register', (req, res) => {
    res.send(`
        <form action="/register" method="POST">
            <label>Username</label>
            <input type="text" name="username"/>
            <label>Password</label>
            <input type="password" name="password"/>
            <input type="submit" value="Register">
        </form>
            `);
});

app.post('/register', async (req, res)=> {
    const hash = await bcrypt.hash(req.body.password, 12);

    db[req.body.username] = hash;

    console.log(hash);

    res.redirect('/login');
});



app.post('/login', async (req, res) => {
    
    const hash = db[req.body.username];
    
    if (!hash) {
        res.status(401).end();
    }
    
    const isValid = await bcrypt.compare(req.body.password, hash);
    
    if (!isValid) {
        res.status(401).send('Unauthorized!');
    }
    
    const payload = {
        username: req.body.username,
        
    };
    
    const token = jsonwebtoken.sign(payload,sercretKey, {expiresIn: '2h'} );
    
    res.cookie('auth', token);
    console.log(token);

    res.send('Successful login!');
});


app.get('/logout', (req, res) => {

    res.clearCookie('user');
    res.end();
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));