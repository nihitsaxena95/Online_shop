let jobSchema = require('./../../model/jobSchema')
let getSeller = require('./getSellers');

module.exports =  (req,res)=>{
	try {
		getSeller(req, res,(seller, order) => { // best seller is selected and generated order id for the order
			console.log("<<",seller)
			if (seller != null) {
			let query = {
				itemId : req.body.attributes.itemId,
				itemName : req.body.attributes.itemName,
				paymentStatus : req.body.attributes.paymentStatus,
				paymentType : req.body.attributes.paymentType,
				orderStatus : order.orderStatus,
				orderId : order.orderId,
				sellerId : seller._id,
				quantity : req.body.attributes.quantity,
				deliveryAddress : req.body.attributes.deliveryAddress,
				currentLocation : {
					lat : seller.nativeLocation.lat,
					long : seller.nativeLocation.long
				}
			}
			jobSchema.insertMany(query, (err, data) => {
					if(err) {
						res.json({
							status : "FAIL",
							error : {
								message : "Internal Server Error."
							}
						})
					} else if(data != undefined) {
						console.log(data);
						res.json({
								status : "SUCCESS",
								attributes : {
									sellerId : data[0].sellerId,
									orderStatus : data[0].orderStatus,
									orderId : data[0].orderId,
									message : data[0].orderStatus
								}
							})
					}
				});
			}
		});

	} catch(err) {
		res.json({
			status : "FAIL",
			error : {
				message : "Internal Server Error."
			}
		})
	}
}