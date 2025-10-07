const mongoose = require("mongoose");
const course = require("./course");
const userSchema = mongoose.Schema({
    fName:String,
    lName:String,
    fatherName:String,
    motherName:String,
    adresse:String,
    tel:Number,
    email:String,
    password:String,
    telChild:Number,
    role:String, 
    specialite:String,  
    img:String,
    cv:String, 
    statut:String,
    courseIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    }],
    gradeIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"grade",
    }]
})
const user = mongoose.model("user",userSchema)
module.exports=user;