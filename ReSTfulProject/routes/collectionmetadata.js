var model = require('./collectionModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');

exports.get = function(req,res){//GET
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var schema = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', schema);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		
		query.exec(function(err, collection) {
			if(err)
			{
				status.status(404, res, {}, '');
			}
			else
			{
				if(collection == null || collection.metadata.description == undefined)//give the undefine into null  && the [] should change into {}
				{
					status.status(404, res, {}, '');
				}
				else
				{
					result = '{"Description" : "' + collection.metadata.description + '", "Date Added": "'+ collection.metadata.date_added +'"}';
					status.status(200, res, {}, result);
				}
			}
		});
	});
}

exports.delete = function(req,res){//DELETE
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var collections = model.createSchema();

	conn.on('error',function(err){
		status.status(500, res, {}, '');
	});
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', collections);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		query.exec(function (err, collection) {
			if (err) 
			{		
				status.status(500,res, {},'');
			}
			else 
			{
				if(collection !== null)
				{
					collection.metadata.description = undefined;
					collection.metadata.date_added = undefined;
					collection.save(function(err){
						if(err)
						{
							status.status(409 ,res, {}, '');
						}
						else
							status.status(200, res, {}, '');
					});
				}
				else
				{
					status.status(404,res, {},'');
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
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', collections);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500,res, {},'');
			}
			else
			{
				if(collection == null){
					status.status(404, res, {}, '');
				}else{
					if(req.body.description == null){
								status.status(400, res, {}, '');
					}else{
						if(collection.metadata.description !== undefined){
							var d = new Date();
							collection.metadata.description = req.body.description;
							collection.metadata.date_added = d;
							collection.metadata.save(function(err){
								if(err)
								{
									status.status(409 ,res, {}, '');
								}
								else
									status.status(200, res, {}, '');
							});
						}else
									status.status(404 ,res, {}, '');							
					}
				}
			}
		});//Remove err after the debug phase is over
	});
}

exports.create = function(req,res){//PUT
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var collections = model.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', collections);
		var query = collectionModel.findOne({'id': req.params.collectionid});
		query.exec(function(err, collection){
			if(err)
			{
				status.status(500,res, {},'');
			}
			else
			{
				if(collection == null){
					status.status(404, res, {}, '');
				}else{
					if(req.body.description == null){
							status.status(400, res, {}, '');
					}else{
						var d = new Date();
						collection.metadata.description = req.body.description;
						collection.metadata.date_added = d;
						collection.save(function(err){
							if(err)
							{
								console.log(err);
								status.status(409 ,res, {}, '');
							}
							else
								status.status(200, res, {}, '');
						});
					}
				}
			}
		});//Remove err after the debug phase is over
	});
}
