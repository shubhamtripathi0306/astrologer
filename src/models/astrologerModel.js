const mongoose = require("mongoose");

const astrologerSchema = new mongoose.Schema(
  {
    astrologerName: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: Number, 
      // required: true 
     },
     password:{
       type:String,
      //  required:true
     },
    experience: {
      type: String,
      // required: true,
    },
    skills: [{ type: String }],

    aboutMe: { type: String },

    astrologerImage:{
      type:String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    languages: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("astrologer", astrologerSchema);
