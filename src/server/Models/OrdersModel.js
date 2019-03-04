const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
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
	cancellation:{
		type: Object,
	},
	isRejected:{
		type: Boolean
	},
	rejectedBy:{
		type: Object
	},
	rejectReason:{
		type: String
	},
	isAccepted: {
		type: Boolean
	},
	acceptedBy: {
		type: Object
	},
	acceptNote: {
		type: String
	},
	isOutForDelivery: {
		type: Boolean
	},
	outForDeliveryBy: {
		type: Object
	},
	outForDeliveryNote: {
		type: String
	},
	isDelivered: {
		type: Boolean
	},
	deliveredConformed: {
		type: Object
	},
	deliveredNote: {
		type: String
	},
	totalToPay:{
		type: Number
	},
	isPriceEdit:{
		type:Boolean
	},
	editedPrice:{
		type:Number
	},
	priceEditedBy:{
		type:Object
	},
	priceEditedNote:{
		type:String
	},
	
});

module.exports = mongoose.model('Orders', OrdersSchema);