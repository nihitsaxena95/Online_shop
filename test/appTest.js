let supertest = require('supertest');
let express = require('express');
let sinon = require('sinon');
let should=require('chai').should();
let expect = require('chai').expect;
let assert = require('chai').assert;
let app = require('../app');

let itemSchema = require('./../model/itemSchema');
let jobSchema = require('./../model/jobSchema');
let sellerSchema = require('./../model/sellerSchema');



let itemInsert = sinon.stub(itemSchema,'insertMany');
let itemfindOne = sinon.stub(itemSchema,'findOne');
let sellerFind = sinon.stub(sellerSchema,'find');
let jobUpdate = sinon.stub(jobSchema,'update');
let jobInsert = sinon.stub(jobSchema,'insertMany');

let url;

describe('insert items to schema',()=>{
  before(()=>{
//yield is used to stub the info required by database
url=supertest(app);
itemInsert.yields(null,{
    itemName : "String",
    itemDescription : "String",
    itemImage : "String",
    price : "String",
    sellers : [
      {
        name : "String",
        sellerId : "String",
        quantityAvailable : "String"
      }
    ],
    itemRating : [
      {
        date : "String",
        rate : "String",
        comment : "String"
      }
    ]
  })
});

  it('insert items to success',(done)=>{
    url
    .post('/createOrderItem')
    .send({
  type : "createOrderItem",
  attributes : {
    itemName : "12",
    itemDescription : "22",
    itemImage : "33",
    price : "44",
    sellers : [
       {
        name : "String",
        sellerId : "String",
        quantityAvailable : "String"
      }
    ]
  }})
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body!=null){
        assert.equal(res.body.status,'SUCCESS');
        done();
      };
    });
  });

});


describe('update items to schema',()=>{
  before(()=>{
    url=supertest(app);
//yield is used to stub the info required by database
jobUpdate.yields(null,{
        itemId : "String",
        itemName : "String",
        paymentStatus : "String",
        paymentType : "String",
        orderStatus : "String",
        orderId : "String",
        quantity : "String",
        sellerId : "String",
        deliveryAddress : {
          AddressLine : "String",
          pincode : "String"
        },
        currentLocation : {
          lat : "String",
          long : "String"
        }
      });
});
  it('update order items',(done)=>{
    url
    .put('/updateOrderInfo')
    .send({
  "type" : "updateOrderInformation" ,
  "attributes" : {
    "itemId" : "",
    "quantity" : "",
    "deliveryAddress" : {
      "AddressLine" : "",
      "pincode" : ""
    }
  }
})
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      else if(res.body!=null){
        assert.equal(res.body.status,'SUCCESS');
        done();
      };
    });
  });


  it('update order items to fail',(done)=>{
    url
    .put('/updateOrderInfo')
    .send(null)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      else if(res.body!=null){
        assert.equal(res.body.status,'FAIL');
        done();
      };
    });
  });



});


describe('buy items to  create jobs',()=>{
  before(()=>{
    url=supertest(app);
//yield is used to stub the info required by database
  itemfindOne.yields(null, {
    itemName : "String",
    itemDescription : "String",
    itemImage : "String",
    price : "String",
    sellers : [
      {
        name : "String",
        sellerId : "String",
        quantityAvailable : 3
      }
    ],
    itemRating : [
      {
        date : "String",
        rate : "String",
        comment : "String"
      }
    ],
  })

  sellerFind.yields(null, [{
        name : "String",
        type : "String",
        rating : "String",
        availability : 5,
        nativeLocation : {
          lat : "String",
          long : "String"
        }
      }])

  jobInsert.yields(null, { nWriten : 1})
});
  it('buy items success',(done)=>{
    url
    .post('/buyItem')
    .send({
  type : "buyItem",
  attributes : {
    itemId : "",
    itemName : "",
    paymentStatus : "",
    paymentType : "",
    quantity : "",
    deliveryAddress : {
      AddressLine : "",
      pincode : ""
    }
  }
})
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body!=null){
        assert.equal(res.body.status,'SUCCESS');
        done();
      };
    });
  });


  it('buy items fail',(done)=>{
    url
    .post('/buyItem')
    .send(null)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err,res)=>{
      if(err){
        return err;
      }
      else if(res.body!=null){
        assert.equal(res.body.status,'FAIL');
        done();
      };
    });
  });


});
