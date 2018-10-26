let express = require('express');
let router = express.Router();
// let trackOrder = require('./trackOrder');
let request = require('ajax-request');
let jobSchema = require('./../../model/jobSchema');

let getSellerLoc = (done) => { // location is captured with ipv4 address of the service provider of the agent
	request({
	  url: 'http://ip-api.com/json',
	  method: 'GET'
	}, function(err, res, body) {
		console.log(JSON.parse(body))
	  	done(JSON.parse(body));
	});
}

module.exports = (io) => {

	io.of('/trackOrder').on('connection', (socket) => {
        console.log('user connected');
        
        // connection is setup at the end point /trackOrder

        socket.on('tracklive', (orderIdInp) => { //when emitting tracklive with order id live location is tracked and updated in db
        	console.log("in")
            setInterval(()=> {
                console.log("inn")
        		jobSchema.findOne({orderId : orderIdInp}, (err,data) => {
        		if(data != undefined) {
        			getSellerLoc((sellerdata) => {
        				let query = {
        					lat : sellerdata.lat,
        					long : sellerdata.long
        				}
        				jobSchema.update({orderId : orderIdInp},
        					{ $set : { currentLocation : query } }, (err, done) => {
        						if(done) {
                                    
        							io.of('/trackOrder').emit('output', sellerdata);
        						}
        					});
        			})
        		}
        	})
        	}, 500)
        })

        socket.on('output', (output) => { // output even can be binded with front end for real time update
          io.of('/trackOrder').emit('output',output);
        }); 

        socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });

   
	return router;
}