//   var markit = require('node-markitondemand');
 //var googleStocks = require('google-stocks');
var http = require("http");
var https = require("https");


exports.lookup = function(ticker){
    console.log(ticker);
 // var markit = require('node-markitondemand');
//"https://www.google.com/finance/info?q=NASDAQ:AAPL"


//https://www.google.com/finance/getprices?i=[PERIOD]&p=[DAYS]d&f=d,o,h,l,c,v&df=cpct&q=[TICKER]
//https://www.google.com/intl/en/googlefinance/disclaimer/

/*
http://www.networkerror.org/component/content/article/1-technical-wootness/44-googles-undocumented-finance-api.html

Here's an example URL to pull all historical data for GOOG at daily granularity:
http://www.google.com/finance/getprices?q=GOOG&x=NASD&i=86400&p=40Y&f=d,c,v,k,o,h,l&df=cpct&auto=0&ei=Ef6XUYDfCqSTiAKEMg

What do all the parameters mean? Here's a partial list:

q - Stock symbol
x - Stock exchange symbol on which stock is traded (ex: NASD)
i - Interval size in seconds (86400 = 1 day intervals)
p - Period. (A number followed by a "d" or "Y", eg. Days or years. Ex: 40Y = 40 years.)
f - What data do you want? d (date - timestamp/interval, c - close, v - volume, etc...) 
Note: Column order may not match what you specify here
df - ??
auto - ??
ei - ??
ts - Starting timestamp (Unix format). If blank, it uses today.
http://www.google.com/finance/getprices?q=GOOG&x=NASD&i=86400&p=40Y&f=d,c,v,k,o,h,l&df=cpct&auto=0&ei=Ef6XUYDfCqSTiAKEMg

The output includes a header that describes the columns, timezone offset, and a few other interesting bits of information.
 The data rows are basically CSV format.

One tricky bit with the first column (the date column) is the full and partial timestamps.
 The full timestamps are denoted by the leading 'a'. Like this: a1092945600 The number after the 'a' is a Unix timestamp.
  (Google it if you're not sure what it is.) The numbers without a leading 'a' are "intervals". 
  So, for example, the second row in the data set below has an interval of 1.
   You can multiply this number by our interval size (a day, in this example) and add it to the last Unix Timestamp.
    That gives you the date for the current row. (So our second row is 1 day after the first row. Easy.)
*/

//"http://www.google.com/finance/getprices?q=GOOG&x=NASD&i=86400&p=40Y&f=d,c,v,k,o,h,l&df=cpct&auto=0&ei=Ef6XUYDfCqSTiAKEMg"

var hostname = "www.google.com"
var path = "/finance/getprices?q=" + ticker + "&x=NASD&i=86400&p=1Y&f=d,c&df=cpct&auto=0"
  https.get({hostname: hostname, path: path},
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
