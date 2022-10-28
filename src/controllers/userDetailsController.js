const userInfo = require("../models/userModel")

const {  isValid, isValidRequestBody} = require('../validator/validator');


const createUserInfo = async (req,res)=>{
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide  details" })
    }
    const { userName, experience, rating, skills, aboutMe,userImage,languages } = req.body

    if (!isValid(userName)) {
        return res.status(400).send({ status: false, message: 'please provide userName' })
    }
    if (!isValid(experience)) {
      return res.status(400).send({ status: false, message: 'please provide experience' })
  }
  if (!isValid(rating)) {
    return res.status(400).send({ status: false, message: 'please give rating' })
}
if (!isValid(skills)) {
  return res.status(400).send({ status: false, message: 'please write your skills' })
}
if (!isValid(aboutMe)) {
  return res.status(400).send({ status: false, message: 'please fill the details' })
}
if (!isValid(userImage)) {
  return res.status(400).send({ status: false, message: 'please upload your image' })
}
if (!isValid(languages)) {
  return res.status(400).send({ status: false, message: 'please fill the languages field' })
}


const userCreated = await userInfo.create(requestBody)
res.status(201).send({ status: true, message: "Success", data: userCreated })
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateUserInfo = async function (req, res) {
  try {
      const userId = req.params.id
      
      const updateData = await userInfo.findById({ _id: userId })

      if (!updateData) {
          return res.status(404).send({ status: false, message: "No data found" })
      }

      const requestBody = req.body
      if (Object.keys(req.body) == 0) {
          return res.status(400).send({ status: false, message: 'please provide data for updation' })
      }
      const updateUserInfo = await userInfo.findOneAndUpdate({ _id: userId }, { ...requestBody }, { new: true })
      return res.status(200).send({ status: true, message: "details updated successfully", data: updateUserInfo })
  }
  catch (err) {
      console.log(err)
      res.status(500).send({ status: false, msg: err.message })
  }
}

const deleteUser = async (req,res)=>{
  try {
      await userInfo.findByIdAndDelete(req.params.id);
  res.status(200).send({status:true,msg:"user deleted successfully"})
  
  } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, msg: "server error" });  
  }
  }

  module.exports= {createUserInfo,updateUserInfo, deleteUser}