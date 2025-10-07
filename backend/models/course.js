const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
    name:String,
    duration:Number,
    description:String,
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    studentIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    gradeIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"grade",
    }]
   
})
const course = mongoose.model("course",courseSchema)
module.exports=course;