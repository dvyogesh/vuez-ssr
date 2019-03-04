const express = require('express');
const Joi = require('joi');
import isEmpty from 'lodash/isEmpty';

const mongoose = require('mongoose');
const orderDb = mongoose.model('Orders');
//const Orders = mongoose.model('Orders');

//import  {isLoggedIn} from '../Auth/middlewares';


const schema = Joi.object().keys({
	title: Joi.string().trim().max(100).required(),
	note: Joi.string().trim().required()
});

const router = express.Router();

router.get('/orders/:id', (req, res) => {
	const paramId = req.params.id
	//console.log(req)
	// console.log('isLoggedIn(req, res)')
	// console.log(req.user._id)
	console.log(paramId)
	orderDb.find({status: paramId}).sort({_id:-1}).limit(200).exec(function(err, notes){
		if (err) {
			console.log(err)
		} else {
			//console.log(notes)
			//res.json(notes);
			res.send(notes);
		}
	})
});

router.post('/orders', (req, res, next) => {
	const result = Joi.validate(req.body, schema);

	if (result.error === null) {
		const dataToStore = {
		  	...req.body,
			userId: req.user._id
		}

		let newNotes = new orderDb(dataToStore);
		newNotes.save(function(err, notes){
			if(err){
				res.send(err);
			} else {
				res.send(notes);
			}
		})

	}
});
router.put('/orders/:id', (req, res, next) => {
	console.log('req.user////')
	console.log(isEmpty(req.user))
	const reqbody = req.body;
	const paramId = req.params.id
	// if (!isEmpty(req.user)) {
	// 	console.log('req.user')
	const {userName, mobileNumber, _id} = req.user.userName
	// console.log(userName)
	// console.log(_id)
	// const dataToStore = {
			
	// }
	if (req.user && reqbody.note ) {

		let dataToStore
		if (reqbody.isAccepting) {
			console.log('isAccepting')
			console.log(reqbody)
			 dataToStore = {
				status:'Accepted',
				isAccepted:true, 
				acceptedBy:{userName:userName, mobileNumber:mobileNumber,_id: _id,date: new Date()},
				acceptNote: reqbody.note,
				totalToPay: reqbody.totalToPay
			} 
		}else if(reqbody.isRejected){
			console.log('rej')
			console.log(reqbody)
			 dataToStore = {
				status:'Rejected',
				isRejected:true, 
				rejectedBy:{userName:userName, mobileNumber:mobileNumber,_id: _id,date: new Date()},
				rejectReason: reqbody.note
			} 
		} else if(reqbody.isOutForDelivery){
			 dataToStore = {
				status:'OutForDelivery',
				isOutForDelivery:true, 
				outForDeliveryBy:{userName:userName, mobileNumber:mobileNumber,_id: _id,date: new Date()},
				outForDeliveryNote: reqbody.note
			}
		} else if (reqbody.isDelivered) {
			 dataToStore = {
				status:'Delivered',
				isDelivered:true, 
				deliveredConformed:{userName:userName, mobileNumber:mobileNumber,_id: _id,date: new Date()},
				deliveredNote: reqbody.note
			}
		} else if (reqbody.isPriceEdit) {
			 dataToStore = {
				isPriceEdit:true, 
				editedPrice: reqbody.editedPrice,
				priceEditedBy:{userName:userName, mobileNumber:mobileNumber,_id: _id,date: new Date()},
				priceEditedNote: reqbody.note
			}
			

		}
		 
		orderDb.updateOne({_id: paramId },{$set:dataToStore},
			//{$set:dataToStore},
			 function(err, order){
			 	console.log('update2')
		    if (err) {
		        console.log("Something wrong when updating data!");
		        res.send(err);
		    } else {res.send(order);}
			});
	} else {
		res.send({err: 'you are not eligible to edit'})
	}
	
})

module.exports = router;