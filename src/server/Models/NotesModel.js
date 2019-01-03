const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
	
	title: {
		type:String,
	},
	note: {
		type:String,
	},
	userId: {
		type:String,
	} 
});

module.exports = mongoose.model('Notes', NotesSchema);