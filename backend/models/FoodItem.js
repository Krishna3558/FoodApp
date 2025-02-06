const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    Name: {
        type: String
    } ,

    img: {
        type: String
    } ,

    category: {
        type: String
    } ,

    options: [
        {
            type: Object
        }
    ]
} , {collection: 'foodItems'});

module.exports = mongoose.model('foodItems' , foodItemSchema);