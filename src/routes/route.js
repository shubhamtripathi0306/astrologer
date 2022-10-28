const express = require('express')
const router = express.Router()
const { createfeedback, updatefeedback, deleteFeedback}= require("../controllers/feedbackController")
const { createUserInfo,updateUserInfo,deleteUser} = require("../controllers/userDetailsController")
const{ sendOTP, verifyOTP, signUpUser,loginUser,logout }=  require("../controllers/userController")
const { authentication, authorisation } = require('../middleware/middleware')
const multer = require("multer")
const multerStorage  = multer.memoryStorage()

const multerfilter = (req,res,cb)=>{
    if(file.mimetype.startWith("image")){
        cb(null,true)
    }else{
        cb(new AppError("not an image"))
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerfilter
})

uploadUserPhoto = upload.single("photo")

router.post('/register', signUpUser);
router.post("/send-otp",sendOTP)
router.post("/verify-otp",verifyOTP)
router.post("/loginUser",loginUser)
router.get("/logoutUser",logout)


router.post('/createUser',createUserInfo)
router.patch('/updateUser',updateUserInfo)
router.delete('/deleteUser',deleteUser)

router.post('/writeFeeds',createfeedback)
router.put('/updateFeeds/:id',updatefeedback)
router.delete('/deleteFeeds/:id',deleteFeedback)


// router.post('/upload', uploadFile.single('image'), (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

module.exports = router