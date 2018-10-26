let mongoose = require('mongoose');
mongoose.set('debug',true);
let Schema=mongoose.Schema;

// Schema defining the items that can be purchased by the customer
// This is the main data set of online store for items present and can be purchased

let item=new Schema({
		itemName : String,
		itemDescription : String,
		itemImage : String,
		price : String,
		sellers : [
			{
				name : String,
				sellerId : String,
				quantityAvailable : String
			}
		],
		itemRating : [
			{
				date : String,
				rate : String,
				comment : String
			}
		],
	},{collection:'item',versionKey: false});

let itemSch= mongoose.model('item',item);

module.exports =  itemSch;