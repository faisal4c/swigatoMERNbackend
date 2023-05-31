require('../db/dbconnection')

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    orders:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})


const Orders=new mongoose.model('Orders',orderSchema);

module.exports=Orders;