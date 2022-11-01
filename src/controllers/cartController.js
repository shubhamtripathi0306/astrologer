const cartModel = require("../models/cartModel")
const {isValidRequestBody,isValidObjectId} = require("../validator/validator")
const productModel = require("../models/productModel");
const UserSignUpModel = require("../models/UserSignUpModel")


exports.createCart = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const requestBody = req.body;
        const { productId, quantity } = requestBody;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please provide valid request body" });
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "Please provide valid User Id" });
        }

        if (!(isValidObjectId(productId))) {
            return res.status(400).send({ status: false, msg: "Please provide valid Product Id" });
        }

        if (!(quantity)) {
            return res.status(400).send({ status: false, msg: "Please provide valid quantity & it must be greater than zero." });
        }

        const findUser = await UserSignUpModel.findById({ _id: userId });

        if (!findUser) {
            return res.status(400).send({ status: false, msg: `User doesn't exist by ${userId}` });
        }

        const findProduct = await productModel.findOne({ _id: productId, isDeleted: false });

        if (!findProduct) {
            return res.status(400).send({ status: false, msg: `Product doesn't exist by ${productId}` });
        }

        const findCartOfUser = await cartModel.findOne({ userId: userId });

        if (!findCartOfUser) {
            var cartData = {
                userId: userId,
                items: [
                    {
                        productId: productId,
                        quantity: quantity,
                    },
                ],
                totalPrice: findProduct.price * quantity,
                totalItems: 1,
               
            };
            const createCart = await cartModel.create(cartData);
            return res.status(201).send({ status: true, msg: `Cart created successfully`, data: createCart });
        }

        if (findCartOfUser) {

            let price = findCartOfUser.totalPrice + req.body.quantity * findProduct.price;

            let arr = findCartOfUser.items;

            for (i in arr) {
                if (arr[i].productId.toString() === productId) {
                    arr[i].quantity += quantity;
                    let updatedCart = {
                        items: arr,
                        totalPrice: price,
                        totalItems: arr.length,
                    };

                    let responseData = await cartModel.findOneAndUpdate(
                        { _id: findCartOfUser._id },
                        updatedCart,
                        { new: true }
                    );
                    return res.status(200).send({ status: true, msg: `Product added successfully`, data: responseData });
                }
            }
            arr.push({ productId: productId, quantity: quantity });

            let updatedCart = {
                items: arr,
                totalPrice: price,
                totalItems: arr.length,
            };

            let responseData = await cartModel.findOneAndUpdate({ _id: findCartOfUser._id }, updatedCart, { new: true });
            return res.status(200).send({ status: true, msg: `Product added successfully`, data: responseData });
        }

    } catch (error) {
        res.status(500).send({ status: false, data: error.msg });
    }
};
