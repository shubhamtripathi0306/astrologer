const mongoose = require('mongoose');

const horoscopeSchema = new mongoose.Schema({
    date: {
        type: String, 
        required: true,
        unique: true
        },

        zodiac: {
        type: String, 
        required: true
    },

    profession: {
        type: String, 
        required: true
    },
    emotion: {
        type: String,
        required: true
    },

    health: {
        type: String, 
        required: true
    }, 
    travel:{
        type:String,
        required:true
    },
    love:{
        type:String,
        required:true
    },
    luck:{
        type:String,
        required:true
    }
},
{ timestamps: true });


module.exports = mongoose.model('horoscope', horoscopeSchema);

