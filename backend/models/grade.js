const mongoose = require("mongoose");
const gradeSchema = mongoose.Schema({
    grade:Number,
    evaluation:String,
    studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    }
   
})
const grade = mongoose.model("grade",gradeSchema)
module.exports=grade;