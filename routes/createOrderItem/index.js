let express = require('express');
let createOrderItem = require('./createOrderItem');

// this end point is used to insert item in the shop

const router = express.Router();
router.post('/',createOrderItem);

module.exports =  router;