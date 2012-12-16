var model = require('./imageModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');
var collectionModel = require('./collectionModel');

exports.add = function(req,res){//POST
	
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var tempSchema = collectionModel.createSchema();
		var tempModel = conn.model('collection', tempSchema);
		var schema = model.createSchema();
		var imageModel = conn.model('image', schema);
		var newImage = new imageModel();
		
		if(req.body.name==null || req.body.author == null || req.body.uri == null)
		{
			status.status(400, res, [], '');
		}
		else
		{
			newImage.name = req.body.name;
			newImage.author = req.body.author;
			newImage.uri = req.body.uri;
			newImage.id = req.body.name + '_' + req.params.collectionid;
			newImage.connectionId = null;
			//Get the collection _id-----------------------
			
			var query = tempModel.findOne({'id':req.params.collectionid});
			query.exec(function(err, collection){
				if(err)
				{
					status.status(500, res, [], '');
				}
				else
				{
					if(collection !== null)
					{
						newImage.collectionId = collection._id;
						newImage.save(function(err){
						if(err)
						{
							console.log(newImage.collectionId);
							status.status(409 ,res, [], '');
						}
						else
						status.status(201, res, [{key: 'location', value: req.url + '/' + newImage.id}], '');
						});//Remove err after the debug phase is over
						
					}
					else
					{
						status.status(404, res, [], '');
					}
				}
			});
			//--------------------------------------------
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
		var imageModel = conn.model('image', schema);
		var collectionId = null;
		//Get the collection _id-----------------------
		var tempSchema = collectionModel.createSchema();
		var tempModel = conn.model('collection', tempSchema);
		
		var query = tempModel.findOne({'id':req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500, res, [], '');
				return 0;
			}
			else
			{
				if(collection !== null)
					collectionId = collection._id;
				else
				{
					status.status(404, res, [], '');
					return 0;
				}
			}
		});
		//--------------------------------------------
		
		var query = imageModel.find({'collection': collectionId});
		
		query.exec(function(err, images) {
			if(err)
			{
				status.status(404, res, [], '');
			}
			else
			{
				if(images == null)
				{
					status.status(404, res, [], '');
				}
				else
				{
					var result = '';
					var i = images.length;
					images.forEach(function(image){
					result += '{"id" : "' + image.id + '" , "uri": ' + req.url + '/' + image.id + '"}';
				
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
		var imageModel = conn.model('image', schema);
		var collectionId = null;
		//Get the collection _id-----------------------
		var tempSchema = collectionModel.createSchema();
		var tempModel = conn.model('collection', tempSchema);
		
		var query = tempModel.findOne({'id':req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500, res, [], '');
				return 0;
			}
			else
			{
				if(collection !== null)
					collectionId = collection._id;
				else
				{
					status.status(404, res, [], '');
					return 0;
				}
			}
		});
		//--------------------------------------------
		var query = imageModel.findOne({'id': req.params.imageid, 'collection': collectionId});
		
		query.exec(function(err, image) {
			if(err)
			{
				status.status(404, res, [], '');
			}
			else
			{
				if(image == null)
				{
					status.status(404, res, [], '');
				}
				else
				{
					result = '{"id" : "' + image.id + '", "name": "'+ image.name +'", "author": "'+ image.author 
					+'","ImageBinary_uri": "' + image.uri + '", "metadata": "'+req.url+'/'+'metadata'+'", "comments": "'+req.url+'/'+'comments'+'"}';
					status.status(200, res, [], result);
				}
			}
		});
	});
}

// Not Allowed, provide error
exports.deleteAll = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var images = model.createSchema();

	conn.on('error',function(err){
		console.log(err);
		status.status(500, res,[], '');
	});
	conn.once('open', function callback () {
		var imageModel = conn.model('image', images);
		var collectionId = null;
		//Get the collection _id-----------------------
		var tempSchema = collectionModel.createSchema();
		var tempModel = conn.model('collection', tempSchema);
		
		var query = tempModel.findOne({'id':req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500, res, [], '');
				return 0;
			}
			else
			{
				if(collection !== null)
					collectionId = collection._id;
				else
				{
					status.status(404, res, [], '');
					return 0;
				}
			}
		});
		//--------------------------------------------
		
		var query=imageModel.find({'collection': collectionId});
		query.exec(function(err, images){
			if(err){
				status.status(500,res,[],'');
			}else{
				images.forEach(function (image){ 
					image.remove(); 
				});
				status.status(200, res,[], '');
			}
		});
	});
}

exports.delete = function(req, res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var images = model.createSchema();

	conn.on('error',function(err){
		status.status(500, res,[], '');
	});
	conn.once('open', function callback () {
		var imageModel = conn.model('image', images);
		var collectionId = null;
		//Get the collection _id-----------------------
		var tempSchema = collectionModel.createSchema();
		var tempModel = conn.model('collection', tempSchema);
		
		var query = tempModel.findOne({'id':req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500, res, [], '');
				return 0;
			}
			else
			{
				if(collection !== null)
					collectionId = collection._id;
				else
				{
					status.status(404, res, [], '');
					return 0;
				}
			}
		});
		//--------------------------------------------
		var query = imageModel.findOne({'id': req.params.imageid, 'collection':collectionId});
		query.exec(function (err, image) {
			if (err) 
			{		
				status.status(500,res,[],'');
			}
			else 
			{
				if(image !== null)
				{
					image.remove();
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
	var images = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var imageModel = conn.model('image', images);
		var collectionId = null;
		//Get the collection _id-----------------------
		var tempSchema = collectionModel.createSchema();
		var tempModel = conn.model('collection', tempSchema);
		
		var query = tempModel.findOne({'id':req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500, res, [], '');
				return 0;
			}
			else
			{
				if(collection !== null)
					collectionId = collection._id;
				else
				{
					status.status(404, res, [], '');
					return 0;
				}
			}
		});
		//--------------------------------------------
		var query = imageModel.findOne({'id': req.params.imageid, 'collection': collectionId});
		query.exec(function(err, image){
			if(err)
			{
				status.status(500,res,[],'');
			}
			else
			{
				if(image == null){
					status.status(404, res, [], '');
				}else{
					image.name = req.body.name;
					image.author = req.body.author;
					image.uri = req.body.uri;
					image.save(function(err){
						if(err)
						{
							status.status(409 ,res, [], err.err);
						}
						else
							status.status(201, res, [{key: 'location', value: req.url + '/' + image.id}], '');
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
