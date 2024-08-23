// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { purchaseItem, deleteItem, getItem, getAllItems, addToCart, getCart, Login } = require('../controller/itemController');


//user
//router.post('/login', Login);

router.post('/purchase', purchaseItem);
router.delete('/delete/:id', deleteItem);
router.get('/getItem/:id', getItem);
router.get('/items', getAllItems); 

//cart
router.post('/addToCart', addToCart);
router.get('/cart', getCart)
// Define the route for getting an item by ID
router.get('/getItem/:id', (req, res, next) => {
    console.log(`Request received with ID: ${req.params.id}`);
    next();
  }, getItem);


module.exports = router;
