const jwt = require("jsonwebtoken")

const authentication = async function (req, res, next) {
  try {
      let token = req.headers["x-auth-token"];
      if (!token) return res.status(400).send({ status: false, msg: "login is required" })
      let decodedtoken = jwt.verify(token, "viper")
      if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
      next();
  }
  catch (error) {
      console.log(error)
      return res.status(500).send({ msg: error.message })
  }
}

let authorisation= async function (req,res,next){
  try{
let id = req.params.id
let jwtToken = req.headers['x-auth-token']

if(!jwtToken)
return res.status(400).send({status: false, msg: "please provide token" })

let verifiedToken = jwt.verify(jwtToken, 'viper')

if(verifiedToken._id != id)

return res.status(403).send({status: false, msg: "unauthorize access "})

next()
}
catch (err) {
return res.status(500).send({ status : false, error: err.msg })
}
}


module.exports = {authentication,authorisation}
