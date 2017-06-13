const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");


//Controllers
var stocks      = require("./../controllers/stocks.controller.server");

router.get("/", function(req, res){
    res.redirect("/");
});

router.get("/stocks/:id", function(req, res){
    stocks.lookup(req.params.id, function(found){
        res.write( JSON.stringify(found,null,"\t") );
        res.end();
    });
})

router.post("/stocks/", function(req, res){
    var sentStocks = req.body.stocks;

    sentStocks.map((stock)=>{
        stocks.update(stock, function(response){

        });
    });

    res.end();
})

router.get("/stocks/", function(req, res){
    stocks.findAll(function(found){

        res.write( JSON.stringify(found,null,"\t") );
        res.end();
    });

})

module.exports = router;