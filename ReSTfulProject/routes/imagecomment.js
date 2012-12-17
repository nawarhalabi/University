var CollectionModel = require('./collectionModel');
var ImageModel = require('./imageModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');

/*getAll================================================================================================*/
/*======================================================================================================*/
exports.getAll = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var CollectionSchema = CollectionModel.createSchema();
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
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
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id':req.params.imageid});
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
								if(image.comments[0]==null)
								{	
									status.status(404, res, [], '');
								}
									else
									{
										var result = '';
										var i = image.comments.length;
										image.comments.forEach(function(comment){
										result += '{"id" : "' + comment.id + '", "author": "'+ comment.author +'", "text" : "' + comment.text + '","Date" : "' + comment.date + '"}';
									
										i=i-1;
										if(i!==0)
											result += ',';
										});
										status.status(200, res, [], result);
									}
							}
						}
					});
			
				}
			}
		});	
	});
}
/*get================================================================================================*/
/*======================================================================================================*/

exports.get = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', CollectionSchema);
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
					
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					query = Imodel.findOne({'id': req.params.imageid ,'comments.id': req.params.imagecommentid });
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
									if(image.comments==null)
								{
									status.status(404, res, [], '');
								}
									else
									{
										result = '{"id" : "' + image.comments[0].id + '", "author": "'+ image.comments[0].author 
										+'", "text" : "' + image.comments[0].text + '","Date" : "' + image.comments[0].date + '"}';
										status.status(200, res, [], result);
									}
							}
						}
					});
			
				}
			}
		});	
	});
}
/*deleteAll================================================================================================*/
/*======================================================================================================*/

exports.deleteAll = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
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
					
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id':req.params.imageid}).exec(function(err, image) {
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
								image.comments = new Array();
								image.save();
								status.status(200, res,[], '');
							}	
						}		
					});
				}
			}
		});
	});
}
/*delete================================================================================================*/
/*======================================================================================================*/

exports.delete = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var collectionModel = conn.model('collection', CollectionSchema);
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
					
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id': req.params.imageid ,'comments.id': req.params.imagecommentid });
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
									if(image.comments[0]==null)
								{
									status.status(404, res, [], '');
								}
									else
									{	
										image.comments[0].remove(req.params.imagecommentid);
										image.save();
										status.status(200,res,[],'');
									}
							}
						}
					});
			
				}
			}
		});
	});
}
/*add================================================================================================*/
/*======================================================================================================*/

exports.add = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var CollectionSchema = CollectionModel.createSchema();
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
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
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id': req.params.imageid});
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
								if(req.body.text==null || req.body.author == null)
								{
									status.status(400, res, [], '');
								}
								else
								{	var newId = new mongoose.Types.ObjectId();
									var d = new Date();
									image.comments.push({'text': req.body.text, 'author': req.body.author, 'id': newId,'Date': + d});
									image.save(function(err){
										if(err)
										{
											status.status(409 ,res, [], '');//We should never get here!!
										}
										else
											status.status(201, res, [{key: 'location', value: req.url + '/' + newId}], '');
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
/*update================================================================================================*/
/*======================================================================================================*/

exports.update = function(req,res){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	var CollectionSchema = CollectionModel.createSchema();
	//Connection Error
	conn.on('error', function(err)
		{
			status.status(500, res, [], '');
		});
	//Connection Successful
	conn.once('open', function callback () {
		var Cmodel = conn.model('collection', CollectionSchema);
		var query = Cmodel.findOne({'id': req.params.collectionid});
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
					var ImageSchema = ImageModel.createSchema();
					var Imodel = conn.model('image', ImageSchema);
					var query = Imodel.findOne({'id': req.params.imageid ,'comments.id': req.params.imagecommentid });
					if(req.body.text==null || req.body.author == null)
					{
						status.status(400, res, '');
					}
					else
					{
						query.exec(function(err, image) {
							if(err)
							{
								status.status(500, res, [], '');
							}
							else
							{
								if(image == null)
								{
									status.status(404, res, [], '');
								}
								else
								{	
										if(image.comments==null)
									{
										status.status(404, res, [], '');
									}
										else
										{	var d = new Date();
											image.comments[0].text=req.body.text;
											image.comments[0].author=req.body.author;
											image.comments[0].date= d;
											image.save(function(err){
												if(err)
												{	
													status.status(409 ,res, [], '');
												}
												else
												{
													status.status(200, res, [], '');
												}
											});
										}
								}
							}
						});
					}
				}
			}
		});
	});
}


// Not Allowed, Provide Error
//exports.create = function(req,res){
//}