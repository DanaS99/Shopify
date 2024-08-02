// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { purchaseItem, deleteItem } = require('../controller/itemController');

router.post('/purchase', purchaseItem);
router.delete('/delete/:id', deleteItem);

module.exports = router;
