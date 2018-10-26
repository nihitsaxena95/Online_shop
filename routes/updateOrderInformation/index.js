let express = require('express');
let updateOrderInfo = require('./updateOrderInfo');

// this end point is build to update the order after it is placed.

const router = express.Router();
router.put('/',updateOrderInfo);

module.exports =  router;