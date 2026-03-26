const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: String,
  price: Number
}, { timestamps: true });

favouriteSchema.index({ user: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteSchema);
