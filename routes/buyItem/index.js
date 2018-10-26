let express = require('express');
let buyItem = require('./buyItem');

// this end point is used at the time of buying the item

const router = express.Router();
router.post('/',buyItem);

module.exports =  router;