import mongoose from "mongoose";
const foodItemSchema= new mongoose.Schema({
    id:{
      type:String,
      required:true,
    },
    name:{
      type:String,
      required:true,
    },
    price:{
      type:Number,
      required:true,
    },
    image:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    restaurantname:{
      type:String,
      required:true,
    },
    });

export default mongoose.model("FoodItem",foodItemSchema);