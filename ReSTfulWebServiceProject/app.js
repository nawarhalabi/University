
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , mongo = require('mongodb');
  
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/*------------------------------------------------------------------------------------------*/
/*Create a Database Connection and configure the Schema-------------------------------------*/
/*------------------------------------------------------------------------------------------*/
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
var Schema = mongoose.Schema;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
  console.log('yes!!');


var authors = new mongoose.Schema({
name: {type: String, required: true, index: {unique: true}},
email: String
});
conn.model('author', authors);

var tags = new mongoose.Schema({
name: {type: String, required: true, index: {unique: true}}
});
conn.model('tag', tags);

var tag_image = new mongoose.Schema({
image: { type: Schema.Types.ObjectId, required: true, ref: 'image' },
tag: { type: Schema.Types.ObjectId, required: true, ref: 'tag' }
});
tag_image.index({image: 1, tag: 1},{unique: true});
conn.model('tag_image', tag_image);


var images = new mongoose.Schema({
name: {type: String, requiered: true},
album: { type: Schema.Types.ObjectId, required: true, ref: 'album' },
metadata: {
	author: { type: Schema.Types.ObjectId, required: true, ref: 'author' },
	description: String,
	date_added: { type: Date, default: Date.now },
	format: String},
comments: [{
	date: { type: Date, default: Date.now },
	text: String,
	author: { type: Schema.Types.ObjectId, required: true, ref: 'author' }
}]
});
images.index({name:1,album:1},{unique:true});
conn.model('image', images);

var albums = new mongoose.Schema({
name: {type: String, requiered: true},
author: { type: Schema.Types.ObjectId, required: true, ref: 'author'},
metadata: {
	description: String,
	date_added: { type: Date, default: Date.now }},
comments: [{
	date: { type: Date, default: Date.now },
	text: String,
	author: { type: Schema.Types.ObjectId, required: true, ref: 'author' }
}]
});
albums.index({name:1,author:1},{unique:true});
conn.model('album', albums);

});
/*------------------------------------------------------------------------------------------*/
/*Routes------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
app.get('/', routes.index);
app.get('/users', user.list);
/*------------------------------------------------------------------------------------------*/
/*Server------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
