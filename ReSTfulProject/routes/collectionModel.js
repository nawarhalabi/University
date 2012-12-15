var mongoose = require('mongoose');
exports.collectionModel = function()
{
	var conn = mongoose.createConnection('mongodb://localhost/Gallerydb');
	//in case of error
	conn.on('error', console.error.bind(console, 'connection error: Collection Schema Couldnt be created'));
	//successful
	var model = null;
	conn.once('open', function callback () {
	console.log('Connected to Database, Creating Collection Schema!!');
		var collections = createSchema();
		model = conn.model('collection', collections);
	});
	return {model: model, connection:conn};
}

exports.createSchema = function()
{
var collections = new mongoose.Schema({
			id: {type: String, required: true, index:{unique:true}},
			name: {type: String, required: true},
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
		collections.index({name:1,author:1},{unique:true});
		return collections;
}