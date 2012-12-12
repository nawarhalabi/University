function createSchema()
{
	var albums = new mongoose.Schema({
	name: {type: String, requiered: true},
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
	var albums = createSchema();
	var albumModel = conn.model('album', albums);
	
	function addErr(err){console.log('Add Error: Error while adding and album to the album collection un response to a post http request' + err)};
	var newAlbum = new albumModel();
	
	var json = req.body;
	
	newAlbum.name = json.name;
	newAlbum.author = json.author;
	newAlbum.comments = [];
	
	newAlbum.save(adderr);
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
