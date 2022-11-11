const express = require('express')
const router = express.Router()
const {adminLogin,adminSignUp}= require("../controllers/adminController")
const { createfeedback, updatefeedback, deleteFeedback}= require("../controllers/feedbackController")
const { createastrologerInfo,updateAstrologerInfo, deleteAstrologer} = require("../controllers/astrologeController")
const{createHoroscope,updatehoroscope,getHoroscope} = require("../controllers/horoscopeController")
const{ signup,verifyNumber,loginUser,logout,update }=  require("../controllers/userController")
const{createCart}= require("../controllers/cartController")
 const {createProduct}= require("../controllers/productController")
const { authentication, authorisation } = require('../middleware/middleware')
const path = require("path");
const multer = require("multer")
const ImageModel = require("../models/imageModel")

const Storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:Storage
}).single('testimg')


router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
            const newImage = new ImageModel({
                name : req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/jpg'
                }
            })
            newImage.save()
            .then(()=>res.send("successfully uploaded"))
            .catch(err=>console.log(err))

        }
    })
})









router.post('/adminSignUp',adminSignUp)
router.post('/adminLogin',adminLogin)



router.post('/signup',signup)
router.post('/verifyPhone',verifyNumber)
router.post("/loginUser",loginUser)
router.get("/logoutUser", authorisation,logout)
// router.put("/updateUser", upload.single("image"),update)

router.put("/updateUser",update)


// router.post('/createAstro',upload.single("image"),createastrologerInfo)
router.post('/createAstro',authorisation,createastrologerInfo)
router.patch('/updateAstro',authorisation,updateAstrologerInfo)
router.delete('/deleteAstro',authorisation,deleteAstrologer)

router.post('/createHoros/:id',authorisation,createHoroscope)
router.patch('/updateHoros',authorisation,updatehoroscope)
router.put('/getHoros',authorisation,getHoroscope)

router.post('/writeFeeds',createfeedback)
router.put('/updateFeeds/:id',updatefeedback)
router.delete('/deleteFeeds/:id',deleteFeedback)

router.post('/createCart',authorisation,createCart)

router.post('/createProduct',upload, createProduct)


module.exports = router