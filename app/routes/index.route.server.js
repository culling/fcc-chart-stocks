const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

router.get("/", function(req, res){
    var user = req.user;

    res.render("index", {"title": config.pageTitle, "user": user } );
});

module.exports = router;