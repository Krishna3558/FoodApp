const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } , 
    userName: {
        type: String,
        required: true
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId ,
                ref: 'foodItems',
                required: true
            } ,
            quantity: {
                type: Number,
                required: true
            },
            userChoice: {
                type: String,
                required: true
            } ,
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending' , 'delivered' , 'cancelled'],
        default: 'pending'
    },
    delAddress: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
} , {timestamps: true});

module.exports = mongoose.model('Order' , orderSchema);