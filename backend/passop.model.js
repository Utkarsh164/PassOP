const mongoose= require("mongoose")

const Schema=new mongoose.Schema({
    site:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})




module.exports=mongoose.model("passop",Schema);


