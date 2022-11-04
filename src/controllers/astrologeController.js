const astrologerModel = require("../models/astrologerModel");

const { isValid, isValidRequestBody } = require("../validator/validator");

exports.createastrologerInfo = async (req, res) => {
  try {
    // const requestBody = req.body;
    // if (!isValidRequestBody(requestBody)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Invalid request parameters. Please provide  details",
    //   });
    // }
  
    const { astrologerName, phoneNumber,password,experience,skills,aboutMe,astrologerImage,languages } = req.body
    const astrologerCreated = await astrologerModel.create({
      astrologerName, phoneNumber,password,experience,skills,aboutMe,astrologerImage,languages
      }  );
       res
         .status(201)
         .send({ status: true, message: "Success", data: astrologerCreated });
     } catch (error) {
       res.status(500).send(error);
       console.log(error)
     }
   };
   


exports.astrologerLogin = async function (req, res) {
  let data = req.body;
  let phoneNumber = data.phoneNumber;
  let password = data.password;

  let result = await astrologerModel.findOne({
    phoneNumber: phoneNumber,
    password: password,
  });
  if (!result) {
    return res
      .status(404)
      .send({ status: false, msg: "Invalid Credentials,please Check..!!" });
  }
  // res.send(result)
  let payload = { _id: result._id };
  let token = jwt.sign(payload, "viper");
  res.setHeader("x-auth-token", token);
  res.send({ status: true, msg: "Successfully LoggedIn", tokenData: token });
};

exports.updateAstrologerInfo = async function (req, res) {
  try {
    const astrologerId = req.params.id;

    const updateData = await astrologerModel.findById({ _id: astrologerId });

    if (!updateData) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    const requestBody = req.body;
    if (Object.keys(req.body) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "please provide data for updation" });
    }
    const updateAstrologer = await astrologerModel.findOneAndUpdate(
      { _id: astrologerId },
      { ...requestBody },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "details updated successfully",
      data: updateAstrologer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: err.message });
  }
};

exports.deleteAstrologer = async (req, res) => {
  try {
    await astrologerModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: true, msg: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server error" });
  }
};

