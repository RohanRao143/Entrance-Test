const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id:Number,
    category:String,
    created_by:Number,
    updated_by:Number
},{timestamps:true});

const Categories = mongoose.model('Categories',categorySchema);

module.exports = Categories;