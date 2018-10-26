let itemSchema = require('./../../model/itemSchema');
let sellerSchema = require('./../../model/sellerSchema');

module.exports = (req, res,done) => {
	try {
		console.log("hereee", req.body)
		itemSchema.findOne({_id : req.body.attributes.itemId},(err, data) => { // seller is selected by qualtity greater than 0 and best rating
			if(err) {
				res.json({
					status : "FAIL",
					error : {
						message : "Internal Server Error."
					}
				})
			} else if(data!= undefined) {
				console.log("------------",data.sellers);
				let sellers = data.sellers.filter((seller) => seller.quantityAvailable > 0);
				sellers = sellers.map(a => a.sellerId);
				sellers = sellers.map(a => a.toString());
				//console.log(sellers.toString());
				sellerSchema.find({_id : {$in : [sellers.toString()]}}, (err, sellData) => {
					console.log(sellData);
					if (err) {
						res.json({
							status : "FAIL",
							error : {
								message : "Internal Server Error."
							}
						})
					} else if(sellData.length > 0) {

						sellData.sort((a,b) => {
							return a.rating - b.rating;
						})

						done(sellData[0],{
							orderId : parseInt(Math.random()*100000),//random num,
							orderStatus : "Placed"
						});
					} else {
						done(null,{
							orderId : parseInt(Math.random()*100000),//random num,
							orderStatus : "Out of Stock"
						});
					}
				})
			} 
		})
	} catch(err) {
		res.json({
			status : "FAIL",
			error : {
				message : "Internal Server Error."
			}
		})
	}
}