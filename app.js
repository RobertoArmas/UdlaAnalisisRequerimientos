var apiPath = "/api/rest/movil";
/* ------------------------------------------
	Dependencias
----------------------------------------------*/
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var connection = require('express-myconnection');
var mysql = require('mysql');
var fs = require('fs');
/* ----------------------------------------------
  Dependencias locales
-------------------------------------------------*/
var usuario = require('.'+ apiPath + '/usuario/usuario');


/* ------------------------------------------
	Instanciar Variables
----------------------------------------------*/

var app = express();
var api = express.Router();

/* ------------------------------------------
	All Enviaroments to FindMe
----------------------------------------------*/
// HERE CONFIG PORT! example port: 8080 (app.set('port', process.env.PORT || 8080);)
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
//app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
//development only
if('development' == app.get('env')){
	app.use(errorHandler());
}

/*-------------------------------------------
	connection peer, register as middleware
	type koneski: single, pool and request
---------------------------------------------*/
app.use(
	connection(mysql,{
		host: 'localhost',
		user: 'root',
		password: 'admin123',
		port: 3306,
		database: 'menu_restaurantes'

	},'request')
	);

/* -----------------------------------------------------------
	API Routes
-------------------------------------------------------------*/
app.use(apiPath,api);
api.get('/usuario/registro', usuario.registar);

//app.use(app.router); - Deprecate
var server = http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port ' + app.get('port'));
});
