const express=require('express')
const foodItemsRouter=express.Router();
const FoodItems=require('../models/FoodItems');

foodItemsRouter.get('/api/getFoodItems',async(req,res)=>{
    try{
        const foodItemsArray=await FoodItems.find({});
        res.status(200).send(foodItemsArray);
    }
    catch(err){
        res.status(400).send({status:'failure',error:err})
    }
})

foodItemsRouter.post('/api/pushFoodItems',async(req,res)=>{
    try{
        const dbres=await FoodItems.insertMany(req.body.json);
        res.send(dbres);

    }
    catch(err){
        res.send(err);
    }
})
module.exports=foodItemsRouter;