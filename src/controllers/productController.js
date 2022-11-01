const productModel=  require("../models/productModel")
const {isValid,isValidRequestBody,isValidLink} = require("../validator/validator")


exports.createProduct = async function(req,res) {
    try {
        const body = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide  details" })
        }
        
        const {bookName, authorName, price, rating, productImage,amazonLink} = body

        if(!isValid(bookName)) {
            return res.status(400).send({ status: false, msg: "bookName is required"})
        }

        if(!isValid(authorName)) {
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

        if(!isValidLink(amazonLink)) {
            return res.status(400).send({ status: false, msg:  "please provide the link here"})
        }


        let duplicateTitle = await productModel.find({bookName:bookName})
        if(duplicateTitle.length != 0) {
            return res.status(400).send({status: false, msg: "book name with this title  already exist"})
        }

        let files = req.files;
        if (files && files.length > 0) {
        let uploadedFileURL = await uploadFile( files[0] );

        const product = {
            bookName, authorName, price, rating, productImage, productImage: uploadedFileURL,amazonLink
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

