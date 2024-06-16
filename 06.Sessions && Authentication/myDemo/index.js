const express = require ('express');
const cookieParser = require ('cookie-parser');
const bcrypt = require ('bcrypt');
const jsonwebtoken = require ('jsonwebtoken');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const db = {};
const secret = 'jbwqb249te712hed09y1onmwlms.q';


app.get('/',(req, res)=> {
    const token = req.cookies['auth'];

    try {
        const decodedToken = jsonwebtoken.verify(token, secret);
        res.send(`Welcome ${decodedToken['username']}`);
    } catch (error) {
        res.status(403).send('Please register and login');
    }


});

app.get('/register', (req, res)=> {
    res.send(`
        <h1>Welcome to the Login Page</h1>
<h2>You can login here</h2>
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
</form>
        `);
});

app.get('/login', (req, res)=> {
    res.send(`
        <h1>Welcome to the Login Page</h1>
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
        <button type="submit">Submit</button>
  </div>
</form>
        `);
});

app.post('/register', async (req, res)=> {
    const hash = await bcrypt.hash(req.body.password,11);

    db[req.body.username] = hash;
    res.redirect('/login');
});

app.post('/login', async (req, res)=> {
    const hash = db[req.body.username];

    if (!hash) {
        return res.status(401).end();
    }

    const isValid = await bcrypt.compare(req.body.password, hash);

    if (!isValid) {
        return res.status(401).send('Invalid Credentials');
    }

    const payLoad = {
        username: req.body.username
    };

    const token = jsonwebtoken.sign(payLoad, secret, {expiresIn: '1h'});
    res.cookie('auth', token);
    res.send('Successful login');

});

app.listen(3000, () => console.log('Server listening on port: 3000'));

