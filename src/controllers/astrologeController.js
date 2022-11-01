const astrologerInfo = require("../models/astrologerModel")

const {  isValid, isValidRequestBody} = require('../validator/validator');

const createastrologerInfo = async (req,res)=>{
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide  details" })
    }
    const { astrologerName, experience, rating, skills, aboutMe,astrologerImage,languages } = req.body

    if (!isValid(astrologerName)) {
        return res.status(400).send({ status: false, message: 'please provide astrologer_name' })
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
if (!isValid(astrologerImage)) {
  return res.status(400).send({ status: false, message: 'please upload your image' })
}
if (!isValid(languages)) {
  return res.status(400).send({ status: false, message: 'please fill the languages field' })
}

const astrologerCreated = await astrologerInfo.create(requestBody)
res.status(201).send({ status: true, message: "Success", data: astrologerCreated })
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateAstrologerInfo = async function (req, res) {
  try {
      const astrologerId = req.params.id
      
      const updateData = await astrologerInfo.findById({ _id: astrologerId })

      if (!updateData) {
          return res.status(404).send({ status: false, message: "No data found" })
      }

      const requestBody = req.body
      if (Object.keys(req.body) == 0) {
          return res.status(400).send({ status: false, message: 'please provide data for updation' })
      }
      const updateAstrologer = await astrologerInfo.findOneAndUpdate({ _id: astrologerId }, { ...requestBody }, { new: true })
      return res.status(200).send({ status: true, message: "details updated successfully", data: updateAstrologer })
  }
  catch (err) {
      console.log(err)
      res.status(500).send({ status: false, msg: err.message })
  }
}

const deleteAstrologer = async (req,res)=>{
  try {
      await astrologerInfo.findByIdAndDelete(req.params.id);
  res.status(200).send({status:true,msg:"user deleted successfully"})
  
  } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, msg: "server error" });  
  }
  }



  module.exports= {createastrologerInfo,updateAstrologerInfo, deleteAstrologer}