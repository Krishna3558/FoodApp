const mongoose = require('mongoose');
const User = require('./User');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User' ,
        required: true
    } , 
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'foodItems',
                required: true
            } ,
            quantity: {
                type: Number,
                required: true
            } ,
            userChoice: {
                type: String,
                required: true
            } ,
            price: {
                type: Number,
                required: true
            }
        }
    ]
} , {timestamps: true});

module.exports = mongoose.model('Cart' , cartSchema);