var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


//ROUTES
var serviceRouter = express.Router();
var serviceRoutes = require('./app/service_routes');
serviceRoutes.setupRoutes(serviceRouter);
app.use('/service', serviceRouter);

var webRouter = express.Router();
var webRoutes = require('./app/web_routes');
webRoutes.setupRoutes(webRouter, __dirname + '/webapp');
app.use('/', webRouter);

//allows serving required front end scripts and stylesheets
app.use(express.static(__dirname + '/webapp/scripts'));
app.use(express.static(__dirname + '/webapp/stylesheets'));

app.listen(port);
console.log('Server running on port ' + port + '\nPress ctrl+c to stop server');