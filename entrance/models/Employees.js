const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    id:Number,
    name:String,
    options:Array,
    created_by:Number,
    update_by:Number
},{timestamps:true});

const Employees = mongoose.model('Employees',employeesSchema);

module.exports = Employees;