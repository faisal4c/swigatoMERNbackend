const express=require('express');
const Orders=require('../models/Orders')
const jwt=require('jsonwebtoken')
const orderRouter=express.Router();


orderRouter.post('/api/addOrder',async(req,res)=>{
    try{
        const createdOrder=await new Orders({
            email:req.body.email,
            orders:req.body.cartArray
        })

        await createdOrder.save();

        res.send({status:"success",message:"Added the Order to My Orders"});
    }
    catch(err){
        res.send({status:"failure",message:err.message});
    }

})

orderRouter.get('/api/getOrders/:email',async(req,res)=>{
    try{
        const email=req.params.email;
        
        const dbres=await Orders.find({email:email});

        if(dbres.length==0){
            throw new Error('Email Does Not Exist')
        }

        res.send({status:"success",orders:dbres});
    }
    catch(err){
        res.send({status:"failure",message:err.message});
    }

})

module.exports=orderRouter;