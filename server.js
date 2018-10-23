// server.js
var express = require('express');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + '/storybook-static'));

var port = process.env.PORT || 5000;
app.listen(port);