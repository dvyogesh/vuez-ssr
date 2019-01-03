const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	// name : { //first column
	// 	type : String,
	// 	required : 'Kindly enter task name'
	// },
	// Created_date : { //second column
	// 	type : Date,
	// 	default : Date.now
	// },
	// status : { //third column
	// 	type : [{
	// 		type : String,
	// 		enum : ['pending', 'ongoing', 'completed']
	// 	}],
	// 	default : ['pending']
	// },
	
	userName: {
		type : String
	},
	mobileNumber: {
		type : String
	},
	mobileNumberAsPass: {
		type:String
	}
	
});

module.exports = mongoose.model('Users', UsersSchema);