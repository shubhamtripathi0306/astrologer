const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    bookName: {
        type: String, 
        required: true,
        unique: true
        },

    weight: {
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
        type: String, 
        required: true
    }, 
    deletedAt: {type: Date, default:null},

    isDeleted: {type: Boolean, default: false}

  }, { timestamps: true });

module.exports = mongoose.model('product', productSchema); 