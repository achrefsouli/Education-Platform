const mongoose = require("mongoose");
const contactSchema=mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
    statut:String,
})
const contact=mongoose.model("contact",contactSchema);
module.exports=contact;