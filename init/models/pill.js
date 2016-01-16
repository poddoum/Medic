var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var PillSchema = new Schema({

	pillName: String,
	amount: Number,
	inventorySlot: Number,
	dispensingTime: Number,
	dispensingFreq: Number,
	dateAdded: Date
	
});

module.exports = mongoose.model('Pill', PillSchema);
