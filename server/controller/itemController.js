// controllers/itemController.js
const axios = require('axios');
const Item = require('../model/ItemSchema');
const Cart = require('../model/CartSchema');
//const users = require('../model/UserSchema');

const mongoose = require('mongoose');

// exports.Login = async (req, res) => {
//   console.log("login");
// };

exports.purchaseItem = async (req, res) => {
  try {
    const { id, title, price, stock, images } = req.body;

    const item = new Item({
      id,
      title,
      price,
      stock,
      images,
      totalPrice: price * stock,
    });

    await item.save();
    res.status(201).send(item);
  } catch (error) {
    console.error('Error adding item:', error.message);
    res.status(500).send('Server error');
  }
};
// exports.purchaseItem = async (req, res) => {
//   try {
//     const { id, stock } = req.body;
//     const response = await axios.get(`https://dummyjson.com/products/${id}`);
//     const itemData = response.data;

//     const item = new Item({
//       id: itemData.id,
//       title: itemData.title,
//       price: itemData.price,
//       stock: itemData.stock,
//       images: itemData.thumbnail,
//       totalPrice: itemData.price * stock
//     });

//     await item.save();
//     res.status(201).send(item);
//   } catch (error) {
//     console.error('Error purchasing item:', error.message);
//     res.status(500).send('Server error');
//   }
// };

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

// exports.getItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate the ID format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).send('Invalid item ID');
//     }

//     // Fetch the item from the database
//     const item = await Item.findById(id);

//     if (!item) {
//       return res.status(404).send('Item not found');
//     }

//     res.status(200).json(item);
//   } catch (error) {
//     console.error('Error fetching item:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.getItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch the item from the database using the custom `id`
//     const item = await Item.findOne({ id });

//     if (!item) {
//       return res.status(404).send('Item not found');
//     }

//     res.status(200).json(item);
//   } catch (error) {
//     console.error('Error fetching item:', error.message);
//     res.status(500).send('Server error');
//   }
// };

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from the database
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).send('Server error');
  }
};

//CART 

exports.addToCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    let cart = await Cart.findOne();
    if (cart) {
      // Cart exists, update it
      const itemIndex = cart.items.findIndex((item) => item.itemId.equals(itemId));
      if (itemIndex > -1) {
        // Item exists in cart, update quantity
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        item.totalPrice = item.price * item.quantity;
        cart.items[itemIndex] = item;
      } else {
        // Item doesn't exist in cart, add new item
        const itemData = await Item.findById(itemId);
        cart.items.push({
          itemId: itemId,
          title: itemData.title,
          price: itemData.price,
          quantity: quantity,
          totalPrice: itemData.price * quantity,
          images: itemData.images,
        });
      }
      cart.updatedAt = Date.now();
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      // No cart exists, create new one
      const itemData = await Item.findById(itemId);
      const newCart = await Cart.create({
        items: [{
          itemId: itemId,
          title: itemData.title,
          price: itemData.price,
          quantity: quantity,
          totalPrice: itemData.price * quantity,
          images: itemData.images,
        }],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).send('Server error');
  }
};


exports.getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ id }).populate('items.itemId');
    console.log("cart")
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).send('Server error');
  }
};
