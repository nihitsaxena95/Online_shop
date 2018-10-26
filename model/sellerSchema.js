let mongoose = require('mongoose');
mongoose.set('debug',true);
let Schema=mongoose.Schema;

// Schema is defined for the seller's data used for defining ratings and selecting best seller.
let seller=new Schema({
				name : String,
				type : String,
				rating : String,
				nativeLocation : {
					lat : String,
					long : String
				}
			},{collection:'seller',versionKey: false});

let sellerSchema= mongoose.model('seller',seller);

module.exports =  sellerSchema;


