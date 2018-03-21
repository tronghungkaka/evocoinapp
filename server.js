//Install express server
const express = require('express');
const app = express();

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

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

app.use(apiProxy('localhost', 3000));

//Serve only static files from dist directory
app.use(express.static(__dirname + '/dist'));

//Start the app by listening default Heroku port
app.listen(process.env.PORT || 8080);