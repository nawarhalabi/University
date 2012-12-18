var model = require('./collectionModel');
var status = require('../public/javascripts/status');
var mongoose = require('mongoose');

exports.getAll = function(req,res){
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
				if(collection == null)
				{
					status.status(404, res, {}, '');
				}
				else
				{
					var result = ''
					//collections.forEach(function(collection){
						collection.comments.forEach(function(comment){
							result += '{"id" : "'+ comment.id +'" , "author": "' + comment.author +
								'", date: "'+ comment.date +'", "text": "'+ comment.text +'"}';
							result += ',';
							});
					//});
					status.status(200, res, {}, result);
				}
			}
		});
	});
}

exports.get = function(req,res){
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
				//	console.log('Here 1');
					status.status(404, res, {}, '');
				}else{
					var j = 0;
					var k = -1;
					var i = collection.comments.length;
					collection.comments.forEach(function(comment){
						if(comment.id == req.params.collectioncommentsid){
							k = j;
						}else{
							j++;
						}
					});
					if(k == -1){
					//	console.log('Here 2  '  +req.params.collectioncommentsid);
						status.status(404, res, {}, '');
					}else{
						result = '{"id" : "'+ comment.id +'" , "author": "' + comment.author +
								'", date: "'+ comment.date +'", "text": "'+ comment.text +'"}';
						status.status(200, res, {}, result);
					}
				}
			}
		});//Remove err after the debug phase is over
	});
}

exports.deleteAll = function(req,res){
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
				//	console.log('Here 1');
					status.status(404, res, {}, '');
				}else{
						var i = collection.comments.length;
						collection.comments.splice(0,i);
						collection.save(function(err){
						if(err)
						{
							status.status(409 ,res, {}, '');
						}
						else
							status.status(200, res, {}, '');
						});
				}
			}
		});//Remove err after the debug phase is over
	});
}

exports.delete = function(req,res){
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
				//	console.log('Here 1');
					status.status(404, res, {}, '');
				}else{
					var j = 0;
					var k = -1;
					collection.comments.forEach(function(comment){
						if(comment.id == req.params.collectioncommentsid){
							k = j;
						}else{
							j++;
						}
					});
					if(k == -1){
					//	console.log('Here 2  '  +req.params.collectioncommentsid);
						status.status(404, res, {}, '');
					}else{
						collection.comments.splice(k,1);
						collection.save(function(err){
						if(err)
						{
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

exports.update = function(req,res){
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
				//	console.log('Here 1');
					status.status(404, res, {}, '');
				}else{
					var j = 0;
					var k = -1;
					collection.comments.forEach(function(comment){
						if(comment.id == req.params.collectioncommentsid){
							k = j;
						}else{
							j++;
						}
					});
					if(k == -1){
					//	console.log('Here 2  '  +req.params.collectioncommentsid);
						status.status(404, res, {}, '');
					}else{
						if(req.body.author == null || req.body.text == null)
						{
							status.status(400, res, {}, '');
						}
						else{
							var d = new Date();
							collection.comments.splice(k,1);
							/*collection.comments[k] = {'date':d,'author':req.body.author
							,'text':req.body.text,'id':req.params.collectioncommentsid};*/
							collection.comments.push({'date':d,'author':req.body.author
							,'text':req.body.text,'id':req.params.collectioncommentsid});
							/*console.log('{id : '+ collection.comments[k].id +' , author: ' + collection.comments[k].author +', date: '+ 
							collection.comments[k].date +', text: '+ collection.comments[k].text +'}');*/
							collection.save(function(err){
								if(err)
								{
									status.status(409 ,res, {}, '');
								}
								else
									status.status(200, res, {}, '');
							});
						}
					}
				}
			}
		});//Remove err after the debug phase is over
	});
}

exports.add = function(req,res){
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
					if(req.body.author == null || req.body.text == null)
						{
							status.status(400, res, {}, '');
						}
					else{
						var newId = new mongoose.Types.ObjectId();
						var d = new Date();
						collection.comments.push({'date':d,'author':req.body.author,'text':req.body.text,'id':newId}); 
						collection.save(function(err){
							if(err)
							{
								status.status(409 ,res, {}, '');
							}
							else
								status.status(201, res, {'location': req.url + '/' + newId}, '');
						});
					}
				}
			}
		});//Remove err after the debug phase is over
	});
}

//Not Allowed, Provide error
exports.create = function(req,res){
	status.status(405,res, {},'');
}