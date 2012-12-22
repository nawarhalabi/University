var CollectionModel = require('./collectionModel');
var ImageModel = require('./imageModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');

exports.get = function(req,res){
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
			query.exec(function(err, collection) {
			if(err)
			{	console.log(err);
				status.status(404, res, {}, '');
			}
			else
			{
				if(collection == null)
				{	console.log('444');
					status.status(404, res, {}, '');
					
				}
				else
				{
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					query = Imodel.findOne({'id': req.params.imageid});
					query.exec(function(err, image) {
						if(err)
						{	console.log('333');
							status.status(404, res, {}, '');
						}
						else
						{
							if(image == null)
							{console.log('222');
								status.status(404, res, {}, '');
							}
							else
							{	
									if(image.metadata.date_added ==null)
								{	console.log('111');
									status.status(404, res, {}, '');
								}
									else
									{
										result = '{"descrption" : "' + image.metadata.description + '" , "Date" : "' + image.metadata.date_added + '"}';
										status.status(200, res, {}, result);
									}
							}
						}
					});
			
				}
			}
		});	
	});
}

exports.delete = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', CollectionSchema);
		var query = collectionModel.findOne({'id': req.params.collectionid});
			query.exec(function(err, collection) {
			if(err)
			{
				status.status(404, res, {}, '');
			}
			else
			{
				if(collection == null)
				{
					status.status(404, res, {}, '');
				}
				else
				{
					
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id': req.params.imageid });
					query.exec(function(err, image) {
						if(err)
						{
							status.status(404, res, {}, '');
						}
						else
						{
							if(image == null)
							{
								status.status(404, res, {}, '');
							}
							else
							{	
									if(image.metadata.date_added==null)
								{
									status.status(404, res, {}, '');
								}
									else
									{	
										image.metadata[0].remove();
										image.save();
										status.status(200, res, {}, '');
									}
							}
						}
					});
			
				}
			}
		});
	});
}

exports.update = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	//Connection Error
	conn.on('error', function(err)
		{ 
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var CollectionSchema = CollectionModel.createSchema();
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
			query.exec(function(err, collection) {
			if(err)
			{	
				status.status(404, res, {}, '');
			}
			else
			{
				if(collection == null)
				{	
					status.status(404, res, {}, '');
				}
				else
				{
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id': req.params.imageid });
					query.exec(function(err, image) {
						if(err)
						{	
							status.status(404, res, {}, '');
						}
						else
						{
							if(image == null || image.metadata.date_added == null)
							{	
								status.status(404, res, {}, '');
							}
							else
							{	
								if(req.body.description==null)
								{
									status.status(400, res, {}, '');
								}
								else
								{	
									var d = new Date();
									image.metadata.description=req.body.description;
									image.metadata.date_added= d;
									//push({'description': req.body.description,'date_added': + d});
									image.save(function(err){
										if(err)
										{	console.log(image.metadata.description);
											status.status(409 ,res, {}, '');
										}
										else
											status.status(200, res, {}, '');
									});//Remove err after the debug phase is over
								}						
							}
						}
					});
				}
			}
		});
	});
}

exports.create = function(req,res){
var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	//Connection Error
	conn.on('error', function(err)
		{ 
			status.status(500, res, {}, '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var CollectionSchema = CollectionModel.createSchema();
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
			query.exec(function(err, collection) {
			if(err)
			{	
				status.status(404, res, {}, '');
			}
			else
			{
				if(collection == null)
				{	
					status.status(404, res, {}, '');
				}
				else
				{
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id': req.params.imageid });
					query.exec(function(err, image) {
						if(err)
						{	
							status.status(404, res, {}, '');
						}
						else
						{
							if(image == null)
							{	
								status.status(404, res, {}, '');
							}
							else
							{	
								if(req.body.description==null)
								{
									status.status(400, res, {}, '');
								}
								else
								{	
									var d = new Date();
									image.metadata.description=req.body.description;
									image.metadata.date_added= d;
									//push({'description': req.body.description,'date_added': + d});
									image.save(function(err){
										if(err)
										{	
											status.status(409 ,res, {}, '');
										}
										else
											status.status(200, res, {}, '');
									});//Remove err after the debug phase is over
								}						
							}
						}
					});
				}
			}
		});
	});
}