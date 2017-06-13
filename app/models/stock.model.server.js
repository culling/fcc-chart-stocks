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


var findAll = function (callback){
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection( collectionName );
        collection.find({}).toArray(function(err, documents) {
            if(err){console.error(err)};
            callback(documents);
            db.close();
        });
    });
}
exports.findAll = findAll;

var getByStockId = function (ticker, res){
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection(collectionName);
        var results = collection.findOne({"ticker" : ticker},
        { _id: 0},
        function(err, result){

            if(err){console.error(err)};
            if (result){
                
                console.log(result);
                console.log("ticker found");
                db.close();
                return res(null, result);
            }else{
                console.log("didnt find ticker");
                db.close();
                return res(null, null );
            }
        });
    });
}
exports.getByStockId = getByStockId;


exports.drop = function(document, res){
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)}
        var collection = db.collection( collectionName );
        collection.drop();
    });
};


exports.create = function(document, res){
    let stock = new Stock(document);
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection( collectionName );

        collection.insertOne(stock, function(err){

        });

        db.close();
    });
}