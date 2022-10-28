const productModel=  require("../models/productModel")
const {isValid,isValidRequestBody} = require("../validator/validator")


exports.createProduct = async function(req,res) {
    try {
        const body = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide  details" })
        }
        
        const {bookName, weight, price, rating, productImage} = body

        if(!isValid(bookName)) {
            return res.status(400).send({ status: false, msg: "bookName is required"})
        }

        if(!isValid(weight)) {
            return res.status(400).send({ status: false, msg: "weight is required"})
        }

        if(!isValid(price)) {
            return res.status(400).send({ status: false, msg: "price is required"})
        }

        if(!isValid(rating)) {
            return res.status(400).send({ status: false, msg: "rating is required"})
        }

        if(!isValid(productImage)) {
            return res.status(400).send({ status: false, msg:  "upload the productImage"})
        }


        let duplicateTitle = await productModel.find({bookName:bookName})
        if(duplicateTitle.length != 0) {
            return res.status(400).send({status: false, msg: "book name with this title  already exist"})
        }

        let files = req.files;
        if (files && files.length > 0) {
        let uploadedFileURL = await uploadFile( files[0] );

        const product = {
            bookName, weight, price, rating, productImage, productImage: uploadedFileURL
        }
        let productData = await productModel.create(product)
        return res.status(201).send({status: true, msg:"Product created successfully", data: productData})
        }
        else{
            return res.status(400).send({status: false, msg: "Product image is required"})
        }

    }
    catch (err) {
        console.log("This is the error :", err.msg)
        res.status(500).send({ msg: "Error", error: err.msg })
    }
}

const deleteProduct =  async(req,res)=>{
    try {
        const productId = req.query.productId
        if (!(/^[0-9a-fA-F]{24}$/.test(productId))) {
            return res.status(400).send({ status: false, msg: 'please provide valid product Id' })
          }

          const productDetails = await productModel.findByIdAndRemove
    } catch (error) {
        res.status(500).send(error)
    }
}