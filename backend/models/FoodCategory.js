const mongoose = require('mongoose');

const foodCatSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    } ,
    img: {
        type: String,
        required: true
    }
} , {collection: 'foodCategory'});

module.exports = mongoose.model('foodCategory' , foodCatSchema);