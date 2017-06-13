'use strict'

var config  = require("./../../config/config");

// mongo
var mongo               = require("mongodb").MongoClient;
var mongoPort           = config.mongoPort;
var mongoDatabase       = config.mongoDatabase;
var collectionName      = "stocks";
var mongoUrl            =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;

class Stock {
    constructor(ticker
        ,exchange){
            this.ticker = ticker;
            this.exchange = exchange || "NASD"
        }
}

exports.findAll = function(callback){
    
            var db = mongo.connect(mongoUrl);
            mongo.connect(mongoUrl, function(err, db){
                if(err){console.error(err)};
                var collection = db.collection( collectionName );
                collection.find({},  function(err, cursor){
                    cursor.toArray(callback)
                    db.close();
                })
            })
}

exports.create = function(document, res){
    let stock = new Stock(document.ticker, document.exchange);


            var db = mongo.connect(mongoUrl);
            mongo.connect(mongoUrl, function(err, db){
                if(err){console.error(err)};
                var collection = db.collection( collectionName );
                collection.insertOne(stock, function(err){
                    if(err){console.error(err)}
                    collection.findOne(stock,
                    {},
                    function(err, stock){
                        if(err){console.error(err)};
                        res(null, stock);
                        db.close();
                    });
                });
            });

}