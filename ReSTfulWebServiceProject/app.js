
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , album = require('./routes/album')
  , image = require('./routes/image')
  , imageComment = require('./routes/imagecomment')
  , albumComment = require('./routes/albumcomment')
  , albumMetadata = require('./routes/albummetadata')
  , imageMetadata = require('./routes/imagemetadata')
  , album = require('./routes/album')
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
  console.log('Connected to Database!!');

var tags = new mongoose.Schema({
name: {type: String, required: true, index: {unique: true}}
});
var tagModel = conn.model('tag', tags);

var tag_image = new mongoose.Schema({
image: { type: Schema.Types.ObjectId, required: true, ref: 'image' },
tag: { type: Schema.Types.ObjectId, required: true, ref: 'tag' }
});
tag_image.index({image: 1, tag: 1},{unique: true});
var tag_imageModel = conn.model('tag_image', tag_image);

var images = new mongoose.Schema({
	id: { type: String, required:true, index:{unique: true}},
	name: {type: String, requiered: true},
	album: { type: Schema.Types.ObjectId, required: true, ref: 'album' },
	metadata: {
		author: { type: String, required: true, ref: 'author' },
		description: String,
		date_added: { type: Date, default: Date.now },
		format: String},
	comments: [{
		id: { type: String, required:true, index:{unique: true}},
		date: { type: Date, default: Date.now },
		text: String,
		author: { type: String, required: true, ref: 'author' }
}]
});
images.index({name:1,album:1},{unique:true});
imageModel = conn.model('image', images);

var albums = new mongoose.Schema({
name: {type: String, requiered: true},
author: { type: String, required: true, ref: 'author'},
metadata: {
	description: String,
	date_added: { type: Date, default: Date.now }},
comments: [{
	id: { type: String, required:true, index:{unique: true}},
	date: { type: Date, default: Date.now },
	text: String,
	author: { type: String, required: true, ref: 'author' }
}]
});
albums.index({name:1,author:1},{unique:true});
var albumModel = conn.model('album', albums);


function adderr(err){console.log('Add Error:' + err)};
var newAlbum = new albumModel();
newAlbum.name = 'WangAlbum';
newAlbum.author = 'Wang';
newAlbum.metadata.description = 'crazykevin777@gmail.com';
newAlbum.comments = null;
newAlbum.save(adderr);
/*
//Add--------------------------------------------------
function adderr(err){console.log('Add Error:' + err)};
var newAuthor = new authorModel();
newAuthor.name = 'Wang';
newAuthor.email = 'crazykevin777@gmail.com';
newAuthor.save(adderr);
//Retrieve---------------------------------------------
var query = authorModel.findOne({'name': 'Wang'});
query.exec(function (err, person) {
  if (err) console.log('retrieve error:' + err);
  else 
  if(person != null)
console.log(person.name + ' ' + person.email);
});
//Update-----------------------------------------------
function updateerr(err, doc){console.log('update error:' + err)};
authorModel.findOneAndUpdate({name: 'NawarHalabi'}, {$set:{name: 'NawarHalabi'}}, {upsert:true}, updateerr);
//Delete-----------------------------------------------

var query = authorModel.findOne({'name': 'Wang'});
query.exec(function (err, person) {
  if (err) console.log('retrieve error:' + err);
  else 
  if(person != null)
  {
console.log(person.name + ' ' + person.email);
	person.remove();
}
    });
*/

});
/*------------------------------------------------------------------------------------------*/
/*Routes------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
app.get('/', routes.index);
app.get('/albums', album.getAll);
app.get('/albums/:albumid', album.get);
app.get('/albums/:albumid/metadata', albumMetadata.get);
app.get('/albums/:albumid/comments', albumComment.getAll);
app.get('/albums/:albumid/comments/:commentsid', albumComment.get);
app.get('/albums/:albumid/images', image.getAll);
app.get('/albums/:albumid/images/:imageid', image.get);
app.get('/albums/:albumid/images/:imageid/metadata', imageMetadata.get);
app.get('/albums/:albumid/images/:imageid/comments', imageComment.getAll);
app.get('/albums/:albumid/images/:imageid/comments/:commentid', imageComment.get);

/*Delete---------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------*/
app.delete('/albums',album.deleteAll);//Don't do this
app.delete('/albums/:albumid', album.delete);
app.delete('/albums/:albumid/metadata', albumMetadata.delete);
app.delete('/albums/:albumid/comments', albumComment.deleteAll);
app.delete('/albums/:albumid/comments/:commentsid', albumComment.delete);
app.delete('/albums/:albumid/images', image.deleteAll);
app.delete('/albums/:albumid/images/:imageid', image.delete);
app.delete('/albums/:albumid/images/:imageid/metadata',imageMetadata.delete);
app.delete('/albums/:albumid/images/:imageid/comments',imageComment.deleteAll);
app.delete('/albums/:albumid/images/:imageid/comments/:commentid', imageComment.delete);
/*post--------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
app.post('/albums', album.add);
app.post('/albums/:albumid', album.update);
app.post('/albums/:albumid/metadata', albumMetadata.update);
app.post('/albums/:albumid/comments', albumComment.add);
app.post('/albums/:albumid/comments/:commentsid', albumComment.update);
app.post('/albums/:albumid/images', image.add);
app.post('/albums/:albumid/images/:imageid', image.update);
app.post('/albums/:albumid/images/:imageid/metadata',imageMetadata.update);
app.post('/albums/:albumid/images/:imageid/comments',imageComment.add);
app.post('/albums/:albumid/images/:imageid/comments/:commentid', imageComment.update);
/*Put---------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
app.put('/albums', album.create);//Don't do it, Nawar will.
app.put('/albums/:albumid', album.add);
app.put('/albums/:albumid/metadata', albumMetadata.create);
app.put('/albums/:albumid/comments', albumComment.create);
app.put('/albums/:albumid/comments/:commentsid', albumComment.add);
app.put('/albums/:albumid/images', image.create);
app.put('/albums/:albumid/images/:imageid', image.add);
app.put('/albums/:albumid/images/:imageid/metadata',imageMetadata.create);
app.put('/albums/:albumid/images/:imageid/comments',imageComment.create);
app.put('/albums/:albumid/images/:imageid/comments/:commentid', imageComment.add);

/*------------------------------------------------------------------------------------------*/
/*Server------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
