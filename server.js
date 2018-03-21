//Install express server
const express = require('express');
const app = express();
var httpProxy = require('http-proxy');
var proxy = new httpProxy.RoutingProxy();

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };

// app.use(allowCrossDomain);

function apiProxy(host, port) {
  return function(req, res, next) {
    if(req.url.match(new RegExp('^\/api\/'))) {
      proxy.proxyRequest(req, res, {host: host, port: port});
    } else {
      next();
    }
  }
}

var cors = require('cors');
app.use(cors());

app.use(apiProxy('https://api.binance.com', 8080));

//Serve only static files from dist directory
app.use(express.static(__dirname + '/dist'));

//Start the app by listening default Heroku port
app.listen(process.env.PORT || 8080);