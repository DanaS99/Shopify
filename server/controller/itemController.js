// controllers/itemController.js
const axios = require('axios');
const Item = require('../model/ItemShema');
const mongoose = require('mongoose');

exports.purchaseItem = async (req, res) => {
  try {
    const { id, stock } = req.body;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    const itemData = response.data;

    const item = new Item({
      id: itemData.id,
      title: itemData.title,
      price: itemData.price,
      stock: itemData.stock,
      images: itemData.thumbnail,
      totalPrice: itemData.price * stock
    });

    await item.save();
    res.status(201).send(item);
  } catch (error) {
    console.error('Error purchasing item:', error.message);
    res.status(500).send('Server error');
  }
};

// exports.deleteItem = async (req, res) => {
//   try {
//     let { id } = req.params;
//     id = id.trim(); 

//     console.log(`Received ID for deletion: ${id}`);
//     console.log(`ID type: ${typeof id}`);
//     console.log(`ID length: ${id.length}`);

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       console.log('Invalid ObjectId format');
//       return res.status(400).send('Invalid item ID');
//     }

//     const objectId = new mongoose.Types.ObjectId(id); 
//     const item = await Item.findByIdAndDelete(objectId);

//     if (!item) {
//       console.log('Item not found');
//       return res.status(404).send('Item not found');
//     }

//     res.status(200).send('Item deleted successfully');
//   } catch (error) {
//     console.error('Error deleting item:', error.message);
//     res.status(500).send('Server error');
//   }
// };

exports.deleteItem = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim();

    if (isNaN(Number(id))) {
      console.log('Invalid ID format');
      return res.status(400).send('Invalid item ID');
    }

    const item = await Item.findOneAndDelete({ id: Number(id) });

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


exports.getItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid item ID');
    }

    // Fetch the item from the database
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error.message);
    res.status(500).send('Server error');
  }
};


exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from the database
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).send('Server error');
  }
};