const adminModel = require("../models/adminModel")
const jwt = require("jsonwebtoken")

exports.adminSignUp = async (req, res, next) => {

  try {
    const { phoneNumber,password} = req.body;

    if (!phoneNumber||!password ) return res.status(400).json({ message: 'please provide the required fields' });


    const adminCreated = await adminModel.create(req.body)
    return res.status(201).json({ message: 'user created successfully' ,data:adminCreated});

  } catch (error) {
    return res.status(500).json({
      errorName: error.name,
      message: error.message
    })
  }
};  

exports.adminLogin = async function (req, res) {
    let data = req.body;
    let phoneNumber = data.phoneNumber;
    let password = data.password;

    let result = await adminModel.findOne({ phoneNumber: phoneNumber, password: password })
    if (!result) {
        return res.status(404).send({ status: false, msg: "Invalid Credentials,please Check..!!" })
    }
    // res.send(result)
    let payload = { _id: result._id };
    let token = jwt.sign(payload, "viper");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, msg: "Successfully LoggedIn", tokenData: token })
}
