const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    feedback:{
        type:String,
        required:false
    }
},{timestamps:true})

module.exports = mongoose.model("feedback",feedbackSchema)