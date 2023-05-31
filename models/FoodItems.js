require('../db/dbconnection.js')
const mongoose=require('mongoose');

const FoodItemsSchema=new mongoose.Schema({
    name:String,
    price:Number,
    isVeg:Boolean,
    ingredients:String,
    image:String
})

const FoodItems=mongoose.model('FoodItems',FoodItemsSchema);

module.exports=FoodItems;