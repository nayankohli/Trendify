const mongoose=require("mongoose");
const user=mongoose.Schema({
    username:String,
    pass:String,
    email:String,
    role:String
})
const product=mongoose.Schema({
    name:String,
    price:Number,
    desc:String
})
module.exports={
    User:mongoose.model('users',user),
    Product:mongoose.model('products',product)
};