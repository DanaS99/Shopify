// controllers/itemController.js
const Item = require('../model/ItemShema');
const mongoose = require('mongoose');

exports.purchaseItem = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    const itemData = response.data;

    const item = new Item({
      id: itemData.id,
      title: itemData.title,
      price: itemData.price,
      quantity: quantity,
      totalPrice: itemData.price * quantity
    });

    await item.save();
    res.status(201).send(item);
  } catch (error) {
    console.error('Error purchasing item:', error.message);
    res.status(500).send('Server error');
  }
};

exports.deleteItem = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim(); // Trim any extraneous whitespace or newline characters

    console.log(`Received ID for deletion: ${id}`);
    console.log(`ID type: ${typeof id}`);
    console.log(`ID length: ${id.length}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format');
      return res.status(400).send('Invalid item ID');
    }

    const objectId = new mongoose.Types.ObjectId(id); // Create ObjectId with `new`
    const item = await Item.findByIdAndDelete(objectId);

    if (!item) {
      console.log('Item not found');
      return res.status(404).send('Item not found');
    }

    res.status(200).send('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).send('Server error');
  }
};
