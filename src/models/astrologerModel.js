const mongoose = require("mongoose");

const astrologerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    skills: [{ type: String }],

    aboutMe: { type: String },

    userImage: [{ type: String }],

    languages: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("astrologer", astrologerSchema);
