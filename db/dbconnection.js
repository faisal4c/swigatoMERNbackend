const mongoose=require('mongoose')
require('dotenv').config()
const url=process.env.MONGO_ATLAS_URL;

mongoose.connect(process.env.MONGO_ATLAS_URL).then(()=>{
    console.log('database connected');
})