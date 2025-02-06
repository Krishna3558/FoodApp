const express = require('express');
const FoodCategory = require('../models/FoodCategory');
const FoodItem = require('../models/FoodItem');
const router = express.Router();

router.post('/category' , async(req , res) => {
    try{
        const data = req.body;
        const foodCat = new FoodCategory(data);
        const response = await foodCat.save();
        if(!response) return res.status(402).json({message: "can't save the data"});
        return res.status(201).json({response: response});
    }
    catch(err){
        console.error(err);
    }
});

router.post('/item' , async(req , res) => {
    try{
        const data = req.body;
        const item = new FoodItem(data);
        const response = await item.save();
        if(!response) return res.status(402).json({message: "can't add food item"});
        return res.status(201).json({response: response});
    }
    catch(err){
        console.error(err);
    }
});

router.get('/category' , async(req , res) => {
    try{
        const data = await FoodCategory.find();
        if(!data) return res.status(402).json({message: "data not found"});
        return res.status(201).json({response: data});
    }
    catch(err){
        console.error(err);
    }
});

router.get('/item' , async(req , res) => {
    try{
        const data = await FoodItem.find();
        if(!data) return res.status(402).json({message: "data not found"});
        return res.status(201).json({response: data});
    }
    catch(err){
        console.error(err);
    }
});

router.get('/cart/:itemId' , async(req , res) => {
    const itemId = req.params.itemId;
    try{
        const data = await FoodItem.findById(itemId);
        if(!data) return res.status(404).json({message: "not found the food item"});
        return res.status(200).json({foodData: data});
    }
    catch(err){
        console.error(err);
    }
})

module.exports = router;