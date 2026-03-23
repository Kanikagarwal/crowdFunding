import Mongoose from 'mongoose';

const organiser = new Mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{  
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    fundAmt:{
        type:Number,
        required:true,
    },
    createdAt:{ 
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports = new Mongoose.model("Organiser",organiser);