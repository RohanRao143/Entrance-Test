const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    id:Number,
    result:Array,
    name:String,
    tests:Array,
    time:Number,
    current_test:Number,
    is_complete:Boolean,
    created_by:Number,
    updated_by:Number,
    is_qualified:Boolean
},{timestamps:true});

const Applicants = mongoose.model('Applicants', applicantSchema);

module.exports = Applicants;