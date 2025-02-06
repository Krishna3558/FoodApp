const express = require('express');
const router = express.Router();
const {jwtAuth} = require('../jwt');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');

router.post('/cart' , jwtAuth , async(req , res) => {
    const userId = req.user.id;
    const {foodItem , quantity , userChoice , price} = req.body;

    try{
        let cart = await Cart.findOne({ userId });
        if(!cart){
            cart = new Cart({userId , items: [{foodItem , quantity , userChoice , price}]});
        }
        else{
            const itemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItem);
            if( itemIndex === -1 ){
                cart.items.push({foodItem , quantity , userChoice , price});
            }
            else{
                cart.items[itemIndex].quantity = quantity;
                cart.items[itemIndex].userChoice = userChoice;
                cart.items[itemIndex].price = price;
            }
        }
        await cart.save();
        res.status(201).json({cart: cart , message: "added to cart"});
    }
    catch(err){
        console.error(err);
    }
});

router.delete('/cart/:foodItemId' , jwtAuth , async(req , res) => {
    const foodId = req.params.foodItemId;
    const userId = req.user.id;
    try{
        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(401).json({message: "Cart is empty or not processing"});
        const updatedItems = cart.items.filter(item => !item.foodItem.equals(foodId));
        cart.items = updatedItems;
        await cart.save();
        res.status(201).json({message: "The food item is deleted"});
    }
    catch(err){
        console.error(err);
    }
});

router.get('/cart' , jwtAuth , async(req , res) => {
    const userId = req.user.id;
    try{
        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(401).json({message: "User didn't have anything in cart"});
        const getItem = cart.items;
        const foodId = [];
        getItem.map(item => foodId.push(item.foodItem));
        res.status(200).json({cart: getItem , foodId: foodId});
    }
    catch(err){
        console.error(err);
    }
});

router.post('/order' , jwtAuth , async(req , res) => {
    const userId = req.user.id;
    const {delAddress , userName , contact} = req.body;
    try{
        const cart = await Cart.findOne({userId});

        if(!cart) return res.status(404).json({message: "Your cart is empty"});

        const items = await Promise.all(
            cart.items.map( async(item) => {
                const foodItem = await FoodItem.findById(item.foodItem);
                return{
                    foodItem: foodItem._id,
                    quantity: item.quantity,
                    price: item.price,
                    userChoice: item.userChoice
                }
            })
        )

        const totalAmount = items.reduce((total , item) => total + item.price*item.quantity , 0);

        const order = new Order({
            userId,
            items,
            totalAmount,
            delAddress,
            userName,
            contact
        });

        await order.save();
        await Cart.findOneAndDelete({userId});

        res.status(200).json({message: "Order placed successfully"});
    }
    catch(err){
        console.error(err);
    }
});

router.put('/cancel/:orderId' , jwtAuth , async(req , res) => {
    const orderId = req.params.orderId;
    const userId = req.user.id;
    try{
        const order = await Order.findOne({_id: orderId , userId});
        if(!order) return res.status(404).json({message: "Order not found"});
        if(order.orderStatus === 'delivered'){
            return res.status(401).json({message: "The order is already delivered"});
        }
        if(order.orderStatus === 'cancelled'){
            return res.status(401).json({message: "The order is already cancelled"});
        }
        order.orderStatus = 'cancelled';
        await order.save();
    }
    catch(err){
        console.error(err);
    }
});

router.get('/order' , jwtAuth , async(req , res) => {
    const userId = req.user.id;
    try{
        const order = await Order.find({userId}).sort({createdAt: -1});
        if (order.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json({ order: order });
    }
    catch(err){
        console.error(err);
    }
});

module.exports = router;