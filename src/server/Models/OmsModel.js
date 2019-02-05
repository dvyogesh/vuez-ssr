const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OmsSchema = new Schema({
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
	fullAddress: {
		type : String
	},
	imageUrl: {
		type : String
	},
	status: {
		type : String,
		default : 'Placed'
	},
	placedDate: {
		type: String,
		default: new Date()
	},
	userId: {
		type: String
	},
	isRejected:{
		type: Boolean
	},
	rejectedBy:{
		type: Object
	}
	
});

module.exports = mongoose.model('Orders', OmsSchema);