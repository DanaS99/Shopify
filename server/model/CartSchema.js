const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        title: String,
        price: Number,
        quantity: Number,
        totalPrice: Number,
        images: String,
      },
    ],
    updatedAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Cart', CartSchema);