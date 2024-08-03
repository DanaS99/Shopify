const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  stock: Number,
  totalPrice: Number,
  images: String,
  purchasedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
