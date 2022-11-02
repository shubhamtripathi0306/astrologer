const mongoose = require('mongoose');

const horoscopeSchema = new mongoose.Schema({
    astrologerName: {
        type: String, 
        required: true,
        unique: true
        },

        phoneNumber: {
        type: String, 
        required: true
    },

    password: {
        type: Number, 
        required: true
    },
    experience: {
        type: Number,
        required: true
    },

    skills: {
        type: String, 
        required: true
    }, 
    astrologerImage:{
        type:String,
        required:true
    },
    aboutMe:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    }
},
{ timestamps: true });


module.exports = mongoose.model('horoscope', horoscopeSchema);

