
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , mongodb = require('mongodb')
  , collection = require('./routes/collection')
  , collectionMetadata = require('./routes/collectionmetadata')
  , collectionComment = require('./routes/collectioncomment')
  , image = require('./routes/image')
  , imageMetadata = require('./routes/imagemetadata')
  , imageComment = require('./routes/imagecomment')
  , status = require('./public/javascripts/status');
var app = express()

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function (req, res, next){
	
		//View the request headers---------------
		console.log(req.headers);
		//Make sure the content-type and accept headers are complatible with the service
		if((req.method == 'POST' || req.method == 'PUT') && req.headers['content-type'] != null && req.headers['content-type'].substring(0,16) != 'application/json')
			status.status(406 ,res, {}, 'Only Accept JSON data');
		else
		{
			if( req.headers['accept'] == null || (req.headers['accept'].split(',').indexOf('application/json') != -1 || req.headers['accept'].split(',').indexOf('*/*') != -1))
				next();
			else
				status.status(415, res, {}, 'Server does not support the media type required')
		}
  });
  app.use(function (req, res, next){
		//delete last uri character if it's a '/'
		if(req.url[req.url.length-1] == '/')
			req.url = req.url.substring(0, req.url.length-1);
		//Disallow unicode characters------------
		var funnyChars = false;
		var keys = Object.keys(req.body);
		Object.keys(req.body).forEach(function(key){
			var detect=/^[a-zA-Z0-9\._-]*$/.test(req.body[key]);
			if(!detect)
				funnyChars = true;
		});
		if(funnyChars == false)
			next();
		else
			status.status(400, res, {}, 'Non-allowed characters found in JSON data');
	});
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*------------------------------------------------------------------------------------------*/
/*Routes------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/
/*Get---------------------------------------------------------------------------------------*/

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
