const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
       type: Number, 
       required: true },
    gender: {
      type: String,
    },
    profession: {
      type: String,
    },
    education: {
      type: String,
    },
    currentCity: {
      type: String,
    },
    homeCity: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    zodiacSign: {
      type: String,
    },
    favouriteAstrologer:{
      type: ObjectId,
      ref: "astrologer"
    }
    // profileImage: {type:String}, 

  },
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);