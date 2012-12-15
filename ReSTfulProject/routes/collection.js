var model = require('./collectionModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');

exports.add = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var schema = model.createSchema();
	
	conn.on('error', console.error.bind(console, 'connection error: Collection Schema Couldnt be created'));
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', schema);
		var newCollection = new collectionModel();
		
		if(req.body.name==null || req.body.author == null)
		{
			console.log(req.body.author);
			status.status(400, res, '');
		}
		else
		{
			newCollection.name = req.body.name;
			newCollection.author = req.body.author;
			newCollection.id = req.body.name + '_' + req.body.author;
			newCollection.save(function(err){
				if(err)//Two possible errors
				{
					status.status(500 ,res, err);
				}
				else
					status.status(201, res, req.url + '/' + newCollection.id);
			});//Remove err after the debug phase is over

		}
	});
}

exports.getAll = function(req,res){
}

exports.get = function(req,res){
}

// Not Allowed, provide error
exports.deleteAll = function(req,res){
}

exports.delete = function(req,res){
}


exports.update = function(req,res){
}

// Not Allowed, provide error
exports.create = function(req,res){
}
