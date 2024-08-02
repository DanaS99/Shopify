const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  quantity: Number,
  totalPrice: Number,
  purchasedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
