var mongoose = require('mongoose');
/*exports.imageModel = function(){
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	//in case of error
	conn.on('error', console.error.bind(console, 'connection error: Image Schema Couldnt be created'));
	//successful
	conn.once('open', function callback () {
	console.log('Connected to Database, Creating Image Schema!!');
	var images = new mongoose.Schema({
		id: { type: String, required:true, index:{unique: true}},
		name: {type: String, requiered: true},
		uri: {type: String, required: true},
		author: { type: String, required: true, ref: 'author' },
		collection: { type: Schema.Types.ObjectId, required: true, ref: 'collection' },
		metadata: {
			description: String,
			date_added: { type: Date, default: Date.now }},
		comments: [{
			id: { type: String, required:true/*, index:{unique: true}*//*},
			date: { type: Date, default: Date.now },
			text: String,
			author: { type: String, required: true, ref: 'author' }
		}]
		});
		images.index({name:1,collection:1},{unique:true});
		imageModel = conn.model('image', images);
		
		return imageModel;
	});
}*/

exports.createSchema = function()
{
	var Schema = mongoose.Schema;
	var images = new mongoose.Schema({
	id: { type: String, required:true, index:{unique: true}},
	name: {type: String, requiered: true},
	uri: {type: String, required: true},
	author: { type: String, required: true},
	collectionId: { type: Schema.Types.ObjectId, required: true, ref: 'collection' },
	metadata: {
		description: String,
		date_added: { type: Date, default: Date.now }},
	comments: [{
		id: { type: String, required:true/*, index:{unique: true}*/},
		date: { type: Date, default: Date.now },
		text: String,
		author: { type: String, required: true}
	}]
	});
	images.index({name:1,collectionId:1},{unique:true});
	return images;
}