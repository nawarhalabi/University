
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , collection = require('./routes/collection')
  , image = require('./routes/image')
  , imageComment = require('./routes/imagecomment')
  , collectionComment = require('./routes/collectioncomment')
  , collectionMetadata = require('./routes/collectionmetadata')
  , imageMetadata = require('./routes/imagemetadata')
  , collection = require('./routes/collection')
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
	author: { type: String, required: true, ref: 'author' },
	collection: { type: Schema.Types.ObjectId, required: true, ref: 'collection' },
	metadata: {
		description: String,
		date_added: { type: Date, default: Date.now },
	comments: [{
		id: { type: String, required:true, index:{unique: true}},
		date: { type: Date, default: Date.now },
		text: String,
		author: { type: String, required: true, ref: 'author' }
}]
});
images.index({name:1,collection:1},{unique:true});
imageModel = conn.model('image', images);

var collections = new mongoose.Schema({.

	id: { type: String, required:true, index:{unique: true}},
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
collections.index({name:1,author:1},{unique:true});
var collectionModel = conn.model('collection', collections);


function adderr(err){console.log('Add Error:' + err)};
var newcollection = new collectionModel();
newcollection.name = 'Wangcollection';
newcollection.author = 'Wang';
newcollection.metadata.description = 'crazykevin777@gmail.com';
newcollection.comments = null;
newcollection.save(adderr);
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
/*Get---------------------------------------------------------------------------------------*/
app.get('/', routes.index);
app.get('/collections', collection.getAll);
app.get('/collections/:collectionid', collection.get);
app.get('/collections/:collectionid/metadata', collectionMetadata.get);
app.get('/collections/:collectionid/collectioncomments', collectionComment.getAll);
app.get('/collections/:collectionid/collectioncomments/:collectioncommentsid', collectionComment.get);
app.get('/collections/:collectionid/images', image.getAll);
app.get('/collections/:collectionid/images/:imageid', image.get);
app.get('/collections/:collectionid/images/:imageid/metadata', imageMetadata.get);
app.get('/collections/:collectionid/images/:imageid/imagecomments', imageComment.getAll);
app.get('/collections/:collectionid/images/:imageid/imagecomments/:imagecommentid', imageComment.get);

/*Delete---------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------*/
app.delete('/collections',collection.deleteAll);//Not Authorized
app.delete('/collections/:collectionid', collection.delete);
app.delete('/collections/:collectionid/metadata', collectionMetadata.delete);
app.delete('/collections/:collectionid/collectioncomments', collectionComment.deleteAll);
app.delete('/collections/:collectionid/collectioncomments/:collectioncommentsid', collectionComment.delete);
app.delete('/collections/:collectionid/images', image.deleteAll);
app.delete('/collections/:collectionid/images/:imageid', image.delete);
app.delete('/collections/:collectionid/images/:imageid/metadata',imageMetadata.delete);
app.delete('/collections/:collectionid/images/:imageid/imagecomments',imageComment.deleteAll);
app.delete('/collections/:collectionid/images/:imageid/imagecomments/:imagecommentid', imageComment.delete);
/*post--------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
app.post('/collections', collection.add);
app.post('/collections/:collectionid', collection.update);
app.post('/collections/:collectionid/metadata', collectionMetadata.update);
app.post('/collections/:collectionid/collectioncomments', collectionComment.add);
app.post('/collections/:collectionid/collectioncomments/:collectioncommentsid', collectionComment.update);
app.post('/collections/:collectionid/images', image.add);
app.post('/collections/:collectionid/images/:imageid', image.update);
app.post('/collections/:collectionid/images/:imageid/metadata',imageMetadata.update);
app.post('/collections/:collectionid/images/:imageid/imagecomments',imageComment.add);
app.post('/collections/:collectionid/images/:imageid/imagecomments/:imagecommentid', imageComment.update);
/*Put---------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
app.put('/collections', collection.create);//Not Authorized
app.put('/collections/:collectionid', collection.add);//Not Authorizd
app.put('/collections/:collectionid/metadata', collectionMetadata.create);
app.put('/collections/:collectionid/collectioncomments', collectionComment.create);//Not Authorized
app.put('/collections/:collectionid/collectioncomments/:collectioncommentsid', collectionComment.add);//Not Authorized
app.put('/collections/:collectionid/images', image.create);//Not Authorized
app.put('/collections/:collectionid/images/:imageid', image.add);//Not Authorized
app.put('/collections/:collectionid/images/:imageid/metadata',imageMetadata.create);
app.put('/collections/:collectionid/images/:imageid/imagecomments',imageComment.create);//Not Authorized
app.put('/collections/:collectionid/images/:imageid/imagecomments/:imagecommentid', imageComment.add);//NA

/*------------------------------------------------------------------------------------------*/
/*Server------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
