// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { purchaseItem, deleteItem, getItem, getAllItems } = require('../controller/itemController');

router.post('/purchase', purchaseItem);
router.delete('/delete/:id', deleteItem);
router.get('/item/:id', getItem);
router.get('/items', getAllItems); 

module.exports = router;
