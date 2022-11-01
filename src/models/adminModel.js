const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    phoneNumber: {
    type: Number, 
    required: true 
   },
   password:{
     type:String,
     required:true
   },
  },
  {timestamps:true}
)


    module.exports = mongoose.model("admin", adminSchema);
