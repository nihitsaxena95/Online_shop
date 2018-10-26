let mongoose = require('mongoose');
mongoose.set('debug',true);
let Schema=mongoose.Schema;

// Schema is defined for the orders that has been placed
// current location is updated and can be tracked using sockets

let job=new Schema({
				itemId : String,
				itemName : String,
				paymentStatus : String,
				paymentType : String,
				orderStatus : String,
				orderId : String,
				quantity : String,
				sellerId : String,
				deliveryAddress : {
					AddressLine : String,
					pincode : String
				},
				currentLocation : {
					lat : String,
					long : String
				}
			},{collection:'job',versionKey: false});

let sellerSchema= mongoose.model('job',job);

module.exports =  sellerSchema;