const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'Victorias Secret',
    resave: false, // would you like the session to re record each time
    saveUninitialized: true,
    cookie: {secure: false} //will only work with https
}));

app.get('/', (req, res) => {
    if (req.session.userInfo) {
        res.send(`Hello ${req.session.userInfo.username}`);
    } else {
        res.send('Please login!');
    }
});

app.get((req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="POST">
        <label>Username</label>
        <input type="text" name="username"/>
        <label>Password</label>
        <input type="password" name="password"/>
        <input type="submit" value="login">
    </form>
        `);
        res.end();
});

app.post('/login', (req, res)=> {
    req.session.userInfo = req.body;
    req.session.priveInfo = '12345';

    res.end();
});


app.get('/logout', (req, res)=> {
    req.session.destroy();
    res.end();
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));