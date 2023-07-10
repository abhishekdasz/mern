const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const dotenv = require('dotenv');

const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
// app.use(cors()); // Enable CORS

app.use(cookieParser());

// Enable CORS with credentials support
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
    credentials: true
  }));

dotenv.config({ path: './config.env' });

// getting the Database Connection src > db > conn.js
require('./db/conn')

app.use(express.json());

// getting thr router.js
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// Middleware
const middleware = (req, res, next)=>{
    console.log("Hello My Middleware");
    next();
}

app.get('/',(req, res)=>{
    res.send("Hello World from the server")
})
// app.get('/about',middleware, (req, res)=>{
//     res.send("Hello World from About Page of the server");
// })
app.get('/contact',(req, res)=>{
    res.send("Hello World from Contact Page of the server");
})

app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`);
})
console.log("Hello World");