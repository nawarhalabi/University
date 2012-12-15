//Errors:------------------------------------------------------------------------------------------------------
var addErr = function(err){console.log('Add Error: Error while adding and album to the album collection un response to a post http request' + err)};	
//-------------------------------------------------------------------------------------------------------------

function status(code, res, err)
{
	if(code==200)//OK on get requests
	{
		res.writeHead('HTTP/1.1 '+200+' OK', {'content-length': 0, 'Date': Date.now});
		res.end('');
	}
	if(code==201)//OK created
	{
		res.writeHead('HTTP/1.1 '+201+' OK', {'content-length': 0, 'Date': Date.now});
		res.end('');	
	}
	if(code==404)//Resource not found
	{
		
	}
	if(code==409)//Conflict on posts or puts
	{
		
	}
	if(code==500)//Server error e.g. database off
	{
		
	}
	if(code==412)//Precondition failed like date added is more recent than the date in the precondition
	{
		
	}
	if(code==406)//Method not acceptable
	{
		
	}
}

function createSchema()
{
	var mongoose = require('mongoose');
	var albums = new mongoose.Schema({
	id: {type: String, required: true, index:{unique:true}},
	name: {type: String, required: true},
	author: { type: String, required: true, ref: 'author'},
	metadata: {
		description: String,
		date_added: { type: Date, default: Date.now }},
	comments: [{
		date: { type: Date, default: Date.now },
		text: String,
		author: { type: String, required: true, ref: 'author' }
	}]
	});
	albums.index({name:1,author:1},{unique:true});
	
	return albums;
}

exports.add = function(req, res)
{
	var mongoose = require('mongoose');
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	conn.on('error', console.error.bind(console, 'connection error:'));
	conn.once('open', function callback () {
	
		var albums = createSchema();
		var albumModel = conn.model('album', albums);
	
		var newAlbum = new albumModel();
	
		var json = req.body;
	
		newAlbum.name = json.name;
		newAlbum.author = json.author;
		newAlbum.comments = [];
		newAlbum.id = newAlbum._id;
	
		newAlbum.save(addErr);

		});
}

exports.getAll = function(req, res){
var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
var albums = createSchema();
var albumModel = conn.model('album', albums);

var query = albumModel.find();

query.exec(function (err, records) {
  if (err)
	{  
		console.log('Error displaying all albums (Could be database connection problem): ' + err);
		res.writeHead(400, {'content-type': 'application/json'});
		res.end(err);
	}
  else 
  {
	res.writeHead(200, {'content-type': 'application/json'});
	res.write('{[');
	if(records != null)
	{
		
		var i = records.length;
		records.forEach(function(record){
			res.write('{"name" : "' + record.name + '"}');
			
			i=i-1;
			console.log(i);
			if(i!==0)
				res.write(',');
			});
	}
	res.end(']}');
	}
});
}
/*
exports.get = function(req, res){
var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
var albums = createSchema();
var albumModel = conn.model('album', albums);

var query = albumModel.find({id: req.params.albumid});

query.exec(function (err, records) {
  if (err)
	{  
		console.log('Error displaying album: (Could be database connection problem): ' + err);
		res.writeHead(400, {'content-type': 'application/json'});
		res.end(err);
	}
  else 
  {
	res.writeHead(200, {'content-type': 'application/json'});
	res.write('{[');
	if(records != null)
	{
		
		var i = records.length;
		records.forEach(function(record){
			res.write('{"name" : "' + record.name + '"}');
			
			i=i-1;
			console.log(i);
			if(i!==0)
				res.write(',');
			});
	}
	res.end(']}');
	}
});
}
*/
exports.delete = function(req, res){
var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
var albums = createSchema();
var albumModel = conn.model('album', albums);

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
	
	var query = albumModel.findOne({'id': req.params.albumid});
	query.exec(function (err, album) {
		if (err) 
		{
			console.log('retrieve error in the delete route:' + err);
			res.writeHead();
			res.end('{"error message": '+ err +'}');
		}
		else 
		{
			if(album != null)
			{
				album.remove();
			}
			else
			{
			
			}
		}
    });	
});
}