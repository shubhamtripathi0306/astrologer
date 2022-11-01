const twillio = require("twilio")
const _ = require('lodash')
const otpGenerator = require('otp-generator')
require("dotenv").config({path : ".env"});
var accountSid = "AC805d81df7192952bb208046a69510fdb"; 
var authToken ="be12401fbc9809fb6884eb7be39391a1";
// console.log(accountSid);
var client = require("twilio")(accountSid, authToken);
const{Otp} = require('../models/otpModel');
const UserSignUpModel = require("../models/UserSignUpModel");
const jwt = require("jsonwebtoken")

const isValidObjectId = (ObjectId) => {
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

exports.sendOTP = async (req, res) => {
  await client.verify
    .services(verifySid)
    .verifications.create({
      to: `+91${req.body.phoneNumber}`,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
  
exports.verifyOTP = async (req, res) => {
  await client.verify
    .services(verifySid)
    .verificationChecks.create({
      to: `+91${req.body.phoneNumber}`,
      code: req.body.otp,
    })
    .then((data) => {
      res.status(200).send({
        status: data.status,
      });
      console.log("verified! 👍");
    })
    .catch((err) => {
      res.status(404).send({
        message: "Wrong OTP entered!",
      });
      console("wrong OTP !!");
    });
};



module.exports.signUpUser = async (req, res, next) => {

  try {
    const { phoneNumber,password, gender,profession,education,currentCity,homeCity,dateOfBirth,zodiacSign} = req.body;

    if (!phoneNumber||!password|| !profession || !education||!currentCity ||!homeCity ||!dateOfBirth ||!gender||!zodiacSign ) return res.status(400).json({ message: 'please provide the required fields' });

    const existingUser = await UserSignUpModel.findOne({ phoneNumber: phoneNumber }).lean();

    if (existingUser)
     return res.status(400).send({status:false,msg:"user already exist"})

    const userCreated = await UserSignUpModel.create(req.body)
    return res.status(201).json({ message: 'user created successfully' ,data:userCreated});

  } catch (error) {
    return res.status(500).json({
      errorName: error.name,
      message: error.message
    })
  }
};

module.exports.loginUser = async (req, res, next) => {
  try{
    let data = req.body;
    let phoneNumber = data.phoneNumber;
    let password = data.password;

    let result = await UserSignUpModel.findOne({ phoneNumber: phoneNumber, password: password })
    if (!result) {
        return res.status(404).send({ status: false, msg: "Invalid Credentials,please Check..!!" })
    }
    // res.send(result)
    let payload = { _id: result._id };
    let token = jwt.sign(payload, "viper");
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
      
  const updateData = await UserSignUpModel.findById({ _id: userId })

  if (!updateData) {
      return res.status(404).send({ status: false, message: "No data found" })
  }

  const requestBody = req.body
  if (Object.keys(req.body) == 0) {
      return res.status(400).send({ status: false, message: 'please provide data for updation' })
  }
  const updateUser = await UserSignUpModel.findOneAndUpdate({ _id: userId }, { ...requestBody }, { new: true })
  return res.status(200).send({ status: true, message: "details updated successfully", data: updateUser })

} catch (error) {
  res.status(500).send({ status: false, msg: error.message })
}
}