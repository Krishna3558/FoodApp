const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    } ,
    email: {
        type: String,
        required: true
    } ,
    password: {
        type: String,
        required: true
    } ,
    phone: {
        type: String,
        required: true
    } ,
    address: {
        type: String,
        required: true
    }
});

userSchema.pre("save" , async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password , salt);
    this.password = hashed;
    next();
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

module.exports = mongoose.model('User' , userSchema);