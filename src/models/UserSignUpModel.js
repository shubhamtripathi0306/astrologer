const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
       type: Number, 
       required: true 
      },
      password:{
        type:String,
        required:true
      },
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
    uploadImage:{
      type:String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function(){

  const token = jwt.sign({
   _id: this._id,
   number:this.number},
   'iam-secret-key',
   {expiresIn:'7d'});
   return token

}
module.exports = mongoose.model("UserSignUpModel", userSchema);
