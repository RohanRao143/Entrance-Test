const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    id:Number,
    type:String,
    description:String,
    created_by:Number,
    update_by:Number
},{timestamps:true});

const Streams = mongoose.model('Stream',streamSchema);

module.exports = Streams;