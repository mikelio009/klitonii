const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative numbers aren't real.");
    },
  
  },
  veprimi: {
    type: String,
  },
  kategorite:{
    type: String
  },
  qyteti: {
    type:String
  },
  nr:{
    type: String
  },
  created_at: Date,
});

const Pronat = mongoose.model('Pronat', postSchema);

module.exports = Pronat;