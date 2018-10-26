# Online Shoping API

 ## Presenting Online Shopping Backend Api with multiple end points for different purposes. 

 ## To run follow following steps : 
 `git clone `

 `npm install` - to install dependencies

 `npm start` - to start server at port 3000

 ## Following is the capability of the application.
- As a user , one is able to add item that can be purchased by the customer. 
- As a user, one is able to add a seller representing its rating and current shop location from which tracking can be done. 
- As a user, one is able to place an order and get the seller which is assigned to the respective order.
- As a user one is able to track order that has been placed via a socket connection.
- As a user one can update the details of the order placed.

 ## Following is the description of multiple endpoints.
- CreateOrder => item is created by the following request which can be purchased by the customer.
end point "/createOrderItem"
	`
		{
	"type" : "createOrderItem",
	"attributes" : {
		"itemName" : "",
		"itemDescription" : "",
		"itemImage" : "",
		"price" : "",
		"sellers" : [
			{
				"name" : "",
				"sellerId" : "",
				"type" : "",
				"rating" : "",
				"availability" : ""
			}
		],
		"itemRating" : [
			{
				"date" : "",
				"rate" : "",
				"comment" : ""
			}
		],
	}
}
	` 
- BuyItem => item is purchased and a fresh order id a created for the job. Its description is updated after different activity. Also the current location at the initial level is placed same as the location of seller. Seller is selected if that seller has the quantity available and has the best rating. Once seller is selected and location is set with all the request parameters. Then it is added to the db in job schema.
end point "/buyItem"
`
{
	"type" : "buyItem",
	"attributes" : {
		"itemId" : "",
		"itemName" : "",
		"paymentStatus" : "",
		"paymentType" : "",
		"quantity" : "",
		"deliveryAddress" : {
			"AddressLine" : "",
			"pincode" : ""
		}
	}
}
`
- UpdateOrderInfo => order details like quality and —— is updated. After the order is placed and same order id is returned with updated status and data.
end point  "/updateOrderInfo"
`
{
	"type" : "updateOrderInformation" ,
	"attributes" : {
		"itemId" : "",
		"quantity" : "",
		"deliveryAddress" : {
			"AddressLine" : "",
			"pincode" : ""
		}
	}
}
`
- TrackOrder => This is the socket endpoint in which whenever a client emits track endpoint then the live location of the seller is obtained and is saved in the current location of the job . Location is obtained via the public ipv4 address of the service provider and city is returned which can be binded by front end and latitude and longitude are saved in db which can be mapped it in map canvas at front end. 

End point : '/trackOrder'
`{ as: 'AS17488 Hathway IP Over Cable Internet',
  city: 'Ghaziabad',
  country: 'India',
  countryCode: 'IN',
  isp: 'Hathway',
  lat: 28.6667,
  lon: 77.4333,
  org: 'Hathway',
  query: '60.254.65.168',
  region: 'UP',
  regionName: 'Uttar Pradesh',
  status: 'success',
  timezone: 'Asia/Kolkata',
  zip: '201014' }
`
## Following are the list of tools used to achieve the task.

`
"dependencies": {
    "ajax-request": "^1.2.3",
    "babel-core": "^6.25.0",
    "babel-polyfill": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "body-parser": "^1.18.3",
    "cookie-parser": "^1.4.3",
    "cors": "^2.8.4",
    "debug": "^3.0.0",
    "express": "^4.15.4",
    "mocha": "^5.2.0",
    "mongoose": "^5.3.5",
    "morgan": "^1.8.2",
    "nodemon": "^1.18.4",
    "serve-favicon": "^2.4.3",
    "sinon": "^7.1.0",
    "socket.io": "^2.1.1",
    "supertest": "^3.3.0"
  },
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "chai": "^4.2.0",
    "chai-http": "^3.0.0",
    "eslint": "^4.5.0",
    "eslint-config-airbnb": "^15.1.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.2",
    "eslint-plugin-mocha": "^4.11.0",
    "eslint-plugin-react": "^7.2.1"
  }`
##Following is the unit test case coverage, run following command to run test cases. 

`npm test`

##Following is the request response structure of the application.
`
{
	"type" : "createOrderItem",
	"attributes" : {
		"itemName" : "",
		"itemDescription" : "",
		"itemImage" : "",
		"price" : "",
		"sellers" : [
			{
				"name" : "",
				"sellerId" : "",
				"quantityAvailable" : ""
			}
		],
		"itemRating" : [
			{
				"date" : "",
				"rate" : "",
				"comment" : ""
			}
		],
	}
}
Output :
{
	"status" : "SUCCESS",
	"attributes" : {
		"itemId" : "",
		"link" : "",
		"message" : ""
	}
}
------------------------------------------
{
	"type" : "buyItem",
	"attributes" : {
		"itemId" : "",
		"itemName" : "",
		"paymentStatus" : "",
		"paymentType" : "",
		"quantity" : "",
		"deliveryAddress" : {
			"AddressLine" : "",
			"pincode" : ""
		}
	}
}
Output :
{
	"status" : "SUCCESS",
	"attributes" : {
		"sellerId" : "",
		"orderStatus" : "",
		"orderId" : "",
		"message" : ""
	}
}
----------------------------------------
{
	"type" : "updateOrderInformation" ,
	"attributes" : {
		"orderId" : "",
		"quantity" : "",
		"deliveryAddress" : {
			"AddressLine" : "",
			"pincode" : ""
		}
	}
}
Output :
{
	"status" : "SUCCESS",
	"attributes" : {
		"orderId" : "",
		"message" : ""
	}
}
`
## Following are the sample outputs . 

- create Order


`{
	"type" : "createOrderItem",
	"attributes" : {
		"itemName" : "nokiA",
		"itemDescription" : "nokia6",
		"itemImage" : "pathToImg",
		"price" : "8000",
		"sellers" : [
			{
				"name" : "Nihit",
				"sellerId" : "5bd2962ca06699cd3fe822a8",
				"quantityAvailable" : "2"
			}
		],
		"itemRating" : [
		]
	}
}
{
    "status": "SUCCESS",
    "attributes": {
        "itemId": "5bd2987cc91b811e44862df6",
        "link": "www.amazon.in/5bd2987cc91b811e44862df6",
        "message": "Item inserted Successfully"
    }
}`

- buy Item
`
{
	"type" : "buyItem",
	"attributes" : {
		"itemId" : "5bd2987cc91b811e44862df6",
		"itemName" : "nokiA",
		"paymentStatus" : "done",
		"paymentType" : "Online",
		"quantity" : "1",
		"deliveryAddress" : {
			"AddressLine" : "Ghaziabad",
			"pincode" : "201014"
		}
	}
}
{
    "status": "SUCCESS",
    "attributes": {
        "sellerId": "5bd2962ca06699cd3fe822a8",
        "orderStatus": "Placed",
        "orderId": "94325",
        "message": "Placed"
    }
}
`

- update order
`
{
	"type" : "updateOrderInformation" ,
	"attributes" : {
		"orderId" : "94325",
		"quantity" : "1",
		"deliveryAddress" : {
			"AddressLine" : "Delhi",
			"pincode" : "110092"
		}
	}
}
{
    "status": "SUCCESS",
    "attributes": {
        "orderId": "94325",
        "message": "Order details updated successfully."
    }
}`


- track order
Live location data : 
`{ as: 'AS17488 Hathway IP Over Cable Internet',
  city: 'Ghaziabad',
  country: 'India',
  countryCode: 'IN',
  isp: 'Hathway',
  lat: 28.6667,
  lon: 77.4333,
  org: 'Hathway',
  query: '60.254.65.168',
  region: 'UP',
  regionName: 'Uttar Pradesh',
  status: 'success',
  timezone: 'Asia/Kolkata',
  zip: '201014' }`

  when connected to socket at the end point '/trackOrder'
  if angular as client use this code for service as reference 

  `
  import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
export class ChatService {
    private url = 'http://localhost:3000/trackOrder';
    private socket;    
    constructor() {
        this.socket = io.connect(this.url);
    }
    public sendMessage(message) {
        this.socket.emit('tracklive', message);
    }
    public getMessages() {
    console.log("called")
        return Observable.create((observer) => {
            this.socket.on('output', (message) => {
                observer.next(message);
            });
        });
    }
}`