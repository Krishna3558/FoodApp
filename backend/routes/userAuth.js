const express = require('express');
const { jwtAuth, genToken } = require('../jwt');
const User = require('../models/User');
const router = express.Router();

router.post('/signup' , async(req , res) => {
    try{
        const data = req.body;
        const isUser = await User.findOne({email: data.email});
        if(isUser){
            return res.status(402).json({message: "user already exists"});
        }
        const user = new User(data);
        const response = await user.save();
        res.status(201).json({message: "user registered"});
    }
    catch(err){
        console.log(err);
    }
});

router.post('/login' , async(req , res) => {
    try{
        const data = req.body;
        const user = await User.findOne({email: data.email});
        if(!user) return res.status(401).json({message: "User doesn't exist"});
        const isMatched = await user.comparePassword(data.password);
        if(!isMatched) return res.status(403).json({message: "password doesn't matched"});
        const payload = {
            id: user._id
        };
        const token = genToken(payload);
        return res.status(201).json({message: "user logged in" , user: user , token: token});
    }
    catch(err){
        console.error(err);
    }
});

router.get('/profile' , jwtAuth , async(req , res) => {
    try{
        const userId = req.user;
        const user = await User.findById(userId);
        if(!user) return res.status(401).json({message: "User didn't found"});
        return res.status(201).json({user});
    }
    catch(err){
        console.error(err);
    }
});

module.exports = router;