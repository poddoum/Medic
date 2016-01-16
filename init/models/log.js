var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var LogSchema = new Schema({

	pillName: String,
	dosage: Number,
	dateDispensed: Date
	
});

module.exports = mongoose.model('Log', LogSchema);