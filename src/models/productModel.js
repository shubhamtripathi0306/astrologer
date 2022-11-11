const mongoose = require('mongoose');
const url = require('mongoose-type-url')
const productSchema = new mongoose.Schema({

    bookName: {
        type: String, 
        required: true,
 
        },

    authorName: {
        type: String, 
        required: true
    },

    price: {
        type: Number, 
        required: true
    },
    rating: {
        type: Number,
        required: true
    },

    productImage: {
        data:Buffer,
        contentType:String

    }, 
    amazonLink:{
        type:String,
        required:true
    },
    deletedAt: {type: Date, default:undefined },

    isDeleted: {type: Boolean, default: false}

  }, { timestamps: true });

module.exports = mongoose.model('product', productSchema); 