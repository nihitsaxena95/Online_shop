let createOrderSchema = require('./../../model/itemSchema');
let jobSchema = require('./../../model/jobSchema')

module.exports =  (req,res)=>{
	try {
		let query = {}
		if(req.body.attributes.quantity != undefined && req.body.attributes.quantity != "") { // dynamic queries as both are optiona fields
			query['quantity'] = req.body.attributes.quantity;
		}
		if(req.body.attributes.deliveryAddress != undefined) {
			query['deliveryAddress'] = req.body.attributes.deliveryAddress;
		}
		
		jobSchema.update({ //updating the data
			orderId : req.body.attributes.orderId
		},{
			$set : query
		}, (err, data) => {
			if(err) {
				res.json({
					status : "FAIL",
					error : {
						message : "Internal Server Error."
					}
				})
			} else if(data != undefined) { // success is returned with appropiate attributes
				console.log(data);
				res.json({
						status : "SUCCESS",
						attributes : {
							orderId : req.body.attributes.orderId,
							message : "Order details updated successfully."
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