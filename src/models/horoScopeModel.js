const mongoose = require('mongoose');

const horoscopeSchema = new mongoose.Schema({

date: { type: String },

horoscope: { type: String },

PROFESSION: { type: String },

EMOTIONS: { type: String },

HEALTH: { type: String },

TRAVEL: { type: String },

LOVE: { type: String },

LUCK: { type: String },

}, 
{ timestamps: true });


module.exports = mongoose.model('horoscope', horoscopeSchema);

