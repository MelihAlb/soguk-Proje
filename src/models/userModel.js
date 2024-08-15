const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nick:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    collection : "user-model",
    timestamps:true
});
const user = mongoose.model("users",userSchema);
module.exports = user;