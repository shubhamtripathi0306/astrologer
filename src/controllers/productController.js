const productModel=  require("../models/productModel")
const {isValid,isValidRequestBody,isValidLink} = require("../validator/validator")
const aws = require("aws-sdk")
const imageModel  =  require("../models/imageModel")
const multer = require("multer")



// console.log(req.body.bookName);

const Storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


const upload = multer({
    storage:Storage
}).single('productImage')

exports.createProduct = async function (req,res) {

//  const productImage = {
//     data:req.file.filename,
//     contentType:'image/jpg'

//     }

    try {
        const newImage = await productModel.create({
                bookName : req.body.bookName,
                authorName : req.body.authorName,
                price : req.body.price,
                rating : req.body.rating,
                productImage :{
                    data:req.file.filename,
                    contentType:'image/jpg'
                
                    },
                amazonLink : req.body.amazonLink,
              
            })
            // newImage.save()
        
        return res.status(201).send({status: true, msg:"Product created successfully", data: newImage})
        
    }  catch (err) {
                console.log(err)
                res.status(500).send({ msg: "Error", error: err.msg })
            }  
}




exports.deleteCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!validator.isValidobjectId(userId)) {
            return res.status(400).send({ status: false, msg: "Invalid userId in params " });
        }
        const findUser = await userModel.findById({ _id: userId });
        if (!findUser) {
            return res.status(400).send({ status: false, msg: `User does not exits by ${userId}` });
        }

        const findCart = await cartModel.findOne({ userId: userId });
        if (!findCart) {
            return res.status(400).send({ status: false, msg: `Cart doesn't exits by ${userId}` });
        }
        const deleteCart = await cartModel.findOneAndUpdate({ userId: userId },
            {
                $set: {
                    items: [],
                    totalPrice: 0,
                    totalItems: 0,
                },
            }, { new: true }).select({ items: 1, totalPrice: 1, totalItems: 1, _id: 0 });
        return res.status(200).send({ status: true, msg: "Cart deleted successfully", data: deleteCart });

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message});
    }
}

