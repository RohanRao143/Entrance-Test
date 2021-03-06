const mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    id:Number,
    name:String,
    questions:Array,    
    key:Array,
    created_by:Number,
    updated_by:Number
},{timestamps:true});

const Tests = mongoose.model('Tests',testSchema);

module.exports = Tests;