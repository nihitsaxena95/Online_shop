let createOrderSchema = require('./../../model/itemSchema')

module.exports =  (req,res)=>{
	try {
		console.log(req.body)
		createOrderSchema.insertMany(req.body.attributes, (err, data) => { //order item is inserted
			if(err) {
				console.log("in")
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
						itemId : data[0]._id,
						link : "www.amazon.in/"+data[0]._id,
						message :"Item inserted Successfully"
					}
				})
			}
		})
	} catch(err) {
		console.log("inn")
		res.json({
			status : "FAIL",
			error : {
				message : "Internal Server Error."
			}
		})
	}
}