var cors = require('cors');

const express=require('express');
const app=express();

const FoodItems=require('./models/FoodItems')

const PORT=process.env.PORT || 5000;

//handling acces control allow origin error using cors npm

//to allow the given domain to access the cookies
app.use(cors());

//to get data from req.body we must use express.json() middleware
app.use(express.json())

//routers
const userRouter=require('./routes/UserRouter');
app.use(userRouter);

const foodItemsRouter=require('./routes/foodItemsRouter');
app.use(foodItemsRouter);

const orderRouter=require('./routes/OrderRouter');
app.use(orderRouter);



app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(PORT);