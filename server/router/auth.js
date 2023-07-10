
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/verifyToken")

require('../db/conn');
const User = require("../model/userSchema");
const Token = require("../model/token")

router.get('/',(req, res)=>{
    res.send("Hello World from the server Router.js")
})

// Async-Await
router.post('/register', async (req, res) =>{
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword) 
    {
        return res.status(422).json({error:"Please fill the fileds properly"});
    }
    try
    {
        const userExist =  await User.findOne({email:email});
        if(userExist)
        {
            return res.status(422).json({error:"Email already exist !!!"});
        }
        const user = new User({name, email, phone, work, password, cpassword});
        
        await user.save();

        res.status(201).json({message:"user registered successfully"});
    }
    catch(err)
    {
        console.log(err);
    }
})

router.post('/signin', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user)
    {
        return res.status(400).json({ message:"Username does not match" });
    }
    try
    {
        let match = await bcrypt.compare(req.body.password, user.password);
        if(match)
        {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY);
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, message: "user signin successfully" });
        }
        else
        {
            return res.status(400).json({ message:"Password does not match" });
        }
    }   
    catch(err)
    {
        console.log(err);
    }
})


// Abouts Page
// here verifyToken is a middleware
router.get('/about',verifyToken, (req, res)=>{
    console.log("hello from Abouts Page");
    res.send(req.user);
})

// logout page
router.get('/logout', (req, res) => {
    res.clearCookie("accessToken", {path:"/"})
    res.status(200).send('user logout');
})

module.exports = router;