//   var markit = require('node-markitondemand');
 //var googleStocks = require('google-stocks');
var http = require("http");
var https = require("https");


exports.lookup = function(ticker){
    console.log(ticker);
 // var markit = require('node-markitondemand');
//"https://www.google.com/finance/info?q=NASDAQ:AAPL"

var test = "www.google.com"
var path = "/finance/getprices?q=" + ticker + "&x=NASD&i=120&sessions=ext_hours&p=5d&f=d,c,v,o,h,l&df=cpct&auto=1&ts=1324323553905"
https.get({hostname: test, path: path},
           function(response){
             var body="";
             response.on("data", function(data){
               body += data;
             });
            response.on("end", function(){
              console.log(body);
            })
})

}
