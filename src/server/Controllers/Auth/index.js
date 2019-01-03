const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const mongoose = require('mongoose');
const users = mongoose.model('Users');

const router = express.Router();

//const users = db.get('users');
//users.createIndex('username', { unique: true });

//const router = express.Router();

const schema = Joi.object().keys({
	username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
	password: Joi.string().trim().min(9).required()
});

// const createTokenSendResponse = function(user, res, next) {
// const createTokenSendResponse = (user, res, next) => {
function createTokenSendResponse(user, res, next) {
	const payload = {
		_id: user._id,
		userName: user
	};

	jwt.sign(payload, HConfig.TOKEN_SECRET, {
		expiresIn: '365d'
	}, (err, token) => {
		if (err) {
			console.log(err)
			respondError422(res, next);
		} else {
			res.json({
				token,
				user
			});
		}
	});
}

// any route in here is pre-pended with /auth
router.get('/check', (req, res, next) => {
	console.log('coolllllll')
	console.log(req.user)
	if (req.user && req.user.userName) {
		res.json(req.user.userName)
	} else {
		respondError422(res, next);
	}
	

});

router.post('/signup', (req, res, next) => {
	const result = Joi.validate(req.body, schema);
	if (result.error === null) {
		users.findOne({
			userName: req.body.username
		}).then(user => {
			// if user is undefined, username is not in the db, otherwise, duplicate user detected
			if (user) {
				// there is already a user in the db with this username...
				// respond with an error!
				const error = new Error('That username is not OG. Please choose another one.');
				res.status(409);
				next(error);
			} else {
				// hash the password
				bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
					// insert the user with the hashed password
					const dataToStore = {
						userName: req.body.username,
						mobileNumber: req.body.password,
						mobileNumberAsPass: hashedPassword
					};




					let newUsers = new users(dataToStore);
					//newOrder.save(function(err, task){

					newUsers.save((err, insertedUser)=>{

						createTokenSendResponse(insertedUser.userName, res, next);
					});
				});
			}
		});
	} else {
		res.status(422);
		next(result.error);
	}
});

function respondError422(res, next) {
	res.json(422);
	//const error = new Error('Unable to login.');
	next();
}

router.post('/login', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const result = Joi.validate(req.body, schema);
	if (result.error === null) {
		users.findOne({
			userName: req.body.username,
		}).then(user => {
			console.log('user')
			console.log(user)
			if (user) {        
				bcrypt
					.compare(req.body.password, user.mobileNumberAsPass)
					.then((result) => {
						if (result) {
							console.log('result')
							console.log(result)
							createTokenSendResponse(user, res, next);
						} else {
							respondError422(res, next);
						}
					}).catch(err => {
						respondError422(res, next);
						console.log('wrong credntials')
				        console.log(err)
				    });
			} else {
				respondError422(res, next);
			}
		});
	} else {
		respondError422(res, next);
	}
});

module.exports = router;