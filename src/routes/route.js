const express = require('express')
const router = express.Router()
const {adminLogin,adminSignUp}= require("../controllers/adminController")
const { createfeedback, updatefeedback, deleteFeedback}= require("../controllers/feedbackController")
const { createastrologerInfo,updateAstrologerInfo, deleteAstrologer} = require("../controllers/astrologeController")
const{ sendOTP, verifyOTP, signUpUser,loginUser,logout,update }=  require("../controllers/userController")
const{createCart}= require("../controllers/cartController")
const {createProduct}= require("../controllers/productController")
const { authentication, authorisation } = require('../middleware/middleware')
const multer = require("multer")
const path = require("path");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
      console.log(file);
    cb(null, path.extname(file.originalname) + "-" + Date.now());
  },
})
var upload = multer({ storage: storage })


router.post('/adminSignUp',adminSignUp)
router.post('/adminLogin',adminLogin)


router.post('/register', signUpUser);
router.post("/send-otp",sendOTP)
router.post("/verify-otp",verifyOTP)
router.post("/loginUser",loginUser)
router.get("/logoutUser", authorisation,logout)
router.put("/updateUser", upload.single("image"),update)


router.post('/createAstro',createastrologerInfo)
router.patch('/updateAstro',updateAstrologerInfo)
router.delete('/deleteAstro',deleteAstrologer)


router.post('/writeFeeds',createfeedback)
router.put('/updateFeeds/:id',updatefeedback)
router.delete('/deleteFeeds/:id',deleteFeedback)

router.post('/createCart',authorisation,createCart)

router.post('/createProduct', createProduct)


module.exports = router