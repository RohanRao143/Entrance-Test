const mongoose = require('mongoose');

const difficultSchema = new mongoose.Schema({
    id:Number,
    difficulty:String,
    created_by:Number,
    updated_by:Number
},{timestamps:true});

const Difficulty = mongoose.model('Difficult',difficultSchema);

module.exports = Difficulty;