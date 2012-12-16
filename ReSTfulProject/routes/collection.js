var model = require('./collectionModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');

exports.add = function(req,res){//POST
	
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var schema = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', schema);
		var newCollection = new collectionModel();
		
		if(req.body.name==null || req.body.author == null)
		{
			status.status(400, res, [], '');
		}
		else
		{
			newCollection.name = req.body.name;
			newCollection.author = req.body.author;
			newCollection.id = req.body.name + '_' + req.body.author;
			newCollection.comments = [];
			newCollection.save(function(err){
				if(err)
				{
					status.status(409 ,res, [], err.err);
				}
				else
					status.status(201, res, [{key: 'location', value: req.url + '/' + newCollection.id}], '');
			});//Remove err after the debug phase is over
		}
	});
}

exports.getAll = function(req,res){//GET
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var schema = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', schema);
		var query = collectionModel.find();
		
		query.exec(function(err, collections) {
			if(err)
			{
				status.status(404, res, [], '');
			}
			else
			{
				if(collections == null)
				{
					status.status(404, res, [], '');
				}
				else
				{
					var result = '';
					var i = collections.length;
					collections.forEach(function(collection){
					result += '{"id" : "' + collection.id + '" , "uri": ' + req.url + '/' + collection.id + '"}';
				
					i=i-1;
					if(i!==0)
						result += ',';
					});
					status.status(200, res, [], result);
				}
			}
		});
	});
}

exports.get = function(req,res){//GET
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var schema = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', schema);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		
		query.exec(function(err, collection) {
			if(err)
			{
				status.status(404, res, [], '');
			}
			else
			{
				if(collection == null)
				{
					status.status(404, res, [], '');
				}
				else
				{
					result = '{"id" : "' + collection.id + '", "name": "'+ collection.name +'", "author": "'+ collection.author 
					+'", "metadata": "'+req.url+'/'+'metadata'+'", "comments": "'+req.url+'/'+'comments'+'", "images": "'+req.url+'/'+'images'+'"}';
					status.status(200, res, [], result);
				}
			}
		});
	});
}

// Not Allowed, provide error
exports.deleteAll = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var collections = model.createSchema();

	conn.on('error',function(err){
		console.log(err);
		status.status(500, res,[], '');
	});
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', collections);
		var query=collectionModel.find();
		query.exec(function(err, collections){
			if(err){
				status.status(500,res,[],'');
			}else{
				collections.forEach(function (collection){ 
					collection.remove(); 
				});
				status.status(200, res,[], '');
			}
		
	
	});
	});
}
exports.delete = function(req, res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var collections = model.createSchema();

	conn.on('error',function(err){
		status.status(500, res,[], '');
	});
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', collections);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		query.exec(function (err, collection) {
			if (err) 
			{		
				status.status(500,res,[],'');
			}
			else 
			{
				if(collection !== null)
				{
					collection.remove();
					status.status(200, res,[], '');
				}
				else
				{
					status.status(404,res,[],'');
				}
			}
		});	
	});
}


exports.update = function(req,res){//POST
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var collections = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', collections);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500,res,[],'');
			}
			else
			{
				if(collection == null){
					status.status(404, res, [], '');
				}else{
					collection.name = req.body.name;
					collection.author = req.body.author;
					collection.save(function(err){
						if(err)
						{
							status.status(409 ,res, [], err.err);
						}
						else
							status.status(201, res, [{key: 'location', value: req.url + '/' + collection.id}], '');
					});
				}
			}
		});//Remove err after the debug phase is over
	});
}

// Not Allowed, provide error
exports.create = function(req,res){
	status.status(405,res,[],'');
}
