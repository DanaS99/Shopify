// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { purchaseItem, deleteItem, getItem, getAllItems } = require('../controller/itemController');

router.post('/purchase', purchaseItem);
router.delete('/delete/:id', deleteItem);
router.get('/getItem/:id', getItem);
router.get('/items', getAllItems); 

// Define the route for getting an item by ID
router.get('/getItem/:id', (req, res, next) => {
    console.log(`Request received with ID: ${req.params.id}`);
    next();
  }, getItem);


module.exports = router;
