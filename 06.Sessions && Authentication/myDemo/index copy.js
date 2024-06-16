const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require ('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


const db= {};
const secretKey = 'sjbiu12g392y1b1ijk2bgui3g1287te812b313/3/3/3';

app.get('/', (req, res)=> {
    const token = req.cookies['auth'];

    try {
        const decodedToken = jsonwebtoken.verify(token, secretKey);
        res.send('Successfull login!');
    } catch (err) {
        res.status(403).end();
    }
});



app.get('/login', (req, res)=> {
  res.send(`<h1>Welcome to the Login Page</h1>
<h2>You can login here</h2>
<form action="/login" method="POST">
    <label for="username">
        Username:
  </label>
  <input type="text" 
         id="username" 
         name="username" 
         placeholder="Enter your Username" required>

  <label for="password">
        Password:
  </label>
  <input type="password"
         id="password" 
         name="password"
         placeholder="Enter your Password" required>

  <div class="wrap">
        <button type="submit">Login</button>
  </div>
</form>`);
});

app.get('/register', (req, res)=> {
    res.send(`<h1>Welcome to the Registration Page</h1>
<h2>You can Register here</h2>
<form action="/register" method="POST">
    <label for="username">
        Username:
  </label>
  <input type="text" 
         id="username" 
         name="username" 
         placeholder="Enter your Username" required>

  <label for="password">
        Password:
  </label>
  <input type="password"
         id="password" 
         name="password"
         placeholder="Enter your Password" required>

  <div class="wrap">
        <button type="submit">Register</button>
  </div>
</form>`);
});

app.post('/register', async (req, res)=> {
    const hash = await bcrypt.hash(req.body.password,11);

    db[req.body.username] = hash;
    res.redirect('/login');
});

app.post('/login', async (req, res)=> {
    const hash = db[req.body.username];

    if (!hash) {
        return res.status(401).send('Unauthorized');
    }
    const isValid = await bcrypt.compare(req.body.password, hash);

    if (!isValid){
        return res.status(401).send('Invalid credentials');
    }

    const payLoad = {
        username: req.body.username
    };

    const token = jsonwebtoken.sign(payLoad, secretKey, {expiresIn: '2h'} );
    res.cookie('auth', token);
    res.redirect('/');
    
});

app.get('/logout', (req, res)=> {
    res.clearCookie('auth');
    res.end();
});

app.listen(3000);