const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    value:String,
    type:String,
    question_id:Array,
    created_by:Number,
    update_by:Number
},{timestamps:true});

const Options = mongoose.model('Options',optionSchema);

module.exports = Options;