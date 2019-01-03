const express = require('express');
const Joi = require('joi');

const mongoose = require('mongoose');
const Orders = mongoose.model('Orders');

//import  {isLoggedIn} from '../Auth/middlewares';


const schema = Joi.object().keys({
	title: Joi.string().trim().max(100).required(),
	note: Joi.string().trim().required()
});

const router = express.Router();

router.get('/', (req, res) => {
	//console.log(req)
	// console.log('isLoggedIn(req, res)')
	// console.log(req.user._id)
	Orders.find({}).limit(20).exec(function(err, notes){
		if (err) {
			console.log(err)
		} else {
			//console.log(notes)
			//res.json(notes);
			res.send(notes);
		}
	})
});

router.post('/', (req, res, next) => {
	const result = Joi.validate(req.body, schema);

	if (result.error === null) {
		const dataToStore = {
		  	...req.body,
			userId: req.user._id
		}

		let newNotes = new Orders(dataToStore);
		newNotes.save(function(err, notes){
			if(err){
				res.send(err);
			} else {
				res.send(notes);
			}
		})

	}


	// if (result.error === null) {
	// 	const note = {
	// 		...req.body,
	// 		user_id: req.user._id
	// 	};

	// 	Notes
	// 		.insert(note)
	// 		.then(note => {
	// 			res.json(note);
	// 		});
	// } else {
	// 	const error = new Error(result.error);
	// 	res.status(422);
	// 	next(error);
	// }
});

module.exports = router;