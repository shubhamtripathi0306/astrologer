const twillio = require("twilio")
const jwt = require('jsonwebtoken')
// const  {uploadFile} = require('../utils/aws')
require('dotenv').config()
const otpGenerator = require('otp-generator')

 let accountSid= process.env.TWILIO_ACCOUNT_SID
let authToken= process.env.TWILIO_AUTH_TOKEN
let twilioPhNo =process.env.PHONE_NO

var client = new twillio(accountSid, authToken);

const {Otp} = require('../models/Otp')
const userModel = require('../models/userModel')
const ImageModel  = require("../models/imageModel")
exports.signup = async (req, res) => {
  
  try {
    const data = req.body

    // const files = req.files;
    // if (files.length == 0)
    //   return res
    //     .status(400)
    //     .send({ status: false, message: `profileImage is Required` });
      //  let profileImg = await uploadFile(files[0]);
      //   data.profileImage = profileImg;

    

    let{phoneNumber} = data

    let user = await userModel.findOne({phoneNumber})
    if(user)
    return res.send({msg:'user exist please login'})

    await userModel.create(data)


const OTP = otpGenerator.generate(6,{  digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})

// console.log(OTP);

   let otpData ={
    phoneNumber :phoneNumber,
    otp:OTP
   }

   
   await Otp.create(otpData)

   client.messages.create({
    from:twilioPhNo,
    to:phoneNumber,
    body:OTP
})

    

  res.status(201).send({status:true,msg:"otp sent successfully"})

  } catch (error) {
    res.status(500).send({status:false,message:error});
  }
}



exports.verifyNumber = async (req,res)=>{

  try{

    let phoneNumber = req.body.phoneNumber
    let otp = req.body.otp


    const otpHolder = await Otp.findOne({phoneNumber})
      if(otpHolder.length === 0)
      return res.status(400).send({message:'your otp has expired'})

      let user = await userModel.findOne({phoneNumber})

      let payload = {
        number : phoneNumber,
        _id: user._id 
}


      let token = jwt.sign(payload,'secret-key')
  
    if(phoneNumber == otpHolder.phoneNumber && otp == otpHolder.otp){

      return res.status(200).send({
        message:"user Registation Success",
        token :token
       
      })

    }else{
      return res.status(400).send('Your OTp was wrong')
  }
  } catch (error) {
    res.status(500).send(error.msg);
  }
}


module.exports.loginUser = async (req, res, next) => {
  try{
    let data = req.body;
    let phoneNumber = data.phoneNumber;
    let password = data.password;

    let user = await userModel.findOne({ phoneNumber: phoneNumber, password: password })
    if (!user) {
        return res.status(404).send({ status: false, msg: "Invalid Credentials,please Check..!!" })
    }
   
    let payload = {
      number : phoneNumber,
      _id: user._id 
}

    let token = jwt.sign(payload, "secret-key");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, msg: "Successfully LoggedIn", tokenData: token })

  } catch (error) {
    return res.status(500).json({
      errorName: error.name,
      message: error.message
    })
  }
}


module.exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
  next();
}

module.exports.update= async(req,res,next)=>{
try {
  const userId = req.query.userId
      
  const files = req.files;

  // let profileImg = await uploadFile(files[0]);
  // data.profileImage = profileImg;

  // console.log(files);

  // const updateData = await userModel.findById({ _id: userId })

  // if (!updateData) {
  //     return res.status(404).send({ status: false, message: "No data found" })
  // }

  // const requestBody = req.body
  // if (Object.keys(req.body) == 0) {
  //     return res.status(400).send({ status: false, message: 'please provide data for updation' })
  // }

  const updateUser = await userModel.findOneAndUpdate({ _id: userId }, { ...requestBody }, { new: true })
  return res.status(200).send({ status: true, message: "details updated successfully", data: updateUser })

} catch (error) {
  res.status(500).send({ status: false, msg: error.message })
  console.log(error)
}
}