const mongoose = require('mongoose');
const schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const { secret_key } = require('../utlis/config.');

const userSchema = new schema({
    googleId:{
       type:String,
       unique:true,
       sparse:true
    },
    facebookId:{
        type:String,
        unique:true,
        sparse:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
}) 

userSchema.methods.generateAuthToken=()=>{
    const token = jwt.sign({userId:this._id},secret_key);
    return token
}

const User = mongoose.model('User',userSchema);

module.exports = User;