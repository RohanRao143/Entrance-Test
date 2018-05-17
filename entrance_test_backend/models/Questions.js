const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id:Number,
    question:String,
    options:Array,
    category_id:Number,
    created_by:Number,
    update_by:Number
},{timestamps:true});

const Questions = mongoose.model('Questions',questionSchema);

module.exports = Questions;