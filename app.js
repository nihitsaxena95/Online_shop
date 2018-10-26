let express = require('express')
let app = express();
let bodyParser = require('body-parser')
let http = require('http');
let server = http.Server(app);

let mongoose = require('mongoose'); //mongodb ORM

let socketIO = require('socket.io');
let io = socketIO(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.io = io;
let buyItem = require('./routes/buyItem')
let createOrderItem = require('./routes/createOrderItem');
let updateOrderInfo = require('./routes/updateOrderInformation');
let trackOrder = require('./routes/trackOrder')(io);

app.use('/buyItem', buyItem); // this end point is used at the time of buying the item
app.use('/createOrderItem', createOrderItem); // this end point is used to insert item in the shop
app.use('/updateOrderInfo', updateOrderInfo); // this end point is build to update the order after it is placed.
app.use('/trackOrder', trackOrder) //live location tracking for agent

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/onlineShop', {server:{auto_reconnect:true}});

let db = mongoose.connection;
db.on('connecting', ()=>{ // connection is setup with mongodb
    console.log("Connecting to mongo")
});
db.on('error', (error)=>{
  console.log("error occured while connecting", error);
  mongoose.disconnect();
});
db.on('connected', ()=>{
    console.log("Connected to mongo")
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

module.exports = server;