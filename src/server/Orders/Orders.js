// var mongoose = require('mongoose');
// var Todo = require('server/db/db').Todo;
import  {isLoggedIn} from '../Controllers/Auth/middlewares';
const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const mongoose = require('mongoose');
const orderDb = mongoose.model('Orders');
const usersDb = mongoose.model('Users');


const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

cloudinary.config({
	cloud_name: "homeolaya", // process.env.CLOUD_NAME,
	api_key: "634645499498269", //process.env.API_KEY,
	api_secret: "ec0wnyaUMCrZiYrUbsWIkSrzbTI" //process.env.API_SECRET
});
const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "demo",
	transformation: [{ width: 500, height: 500, crop: "limit" }],
	quality: 80
});
const parser = multer({ storage: storage });



router.post("/orderNow", parser.single("file"), function(req, res, next) {
	
	console.log('/////****req')
	const reqBody = req.body;
	//console.log(req.file) 
	console.log(req.file) // to see what is returned to you
	const image = {};
	image.url = req.file.secure_url;
	image.id = req.file.public_id;

	
	





	//const result = Joi.validate(req.body, schema);
	if (req.body.userName) {
		usersDb.findOne({
			userName: req.body.userName
		}).then(user => {
			// if user is undefined, username is not in the db, otherwise, duplicate user detected
			if (user) {
				console.log('user')
				console.log(user)
				function createTokenSendResponse(userDetails) {
					const payload = {
						_id: userDetails._id,
						userName: userDetails
					};
					req.user = userDetails;
					jwt.sign(payload, HConfig.TOKEN_SECRET, {
						expiresIn: '365d'
					}, (err, token) => {
						if (err) {
							console.log(err)
							respondError422(res, next);
						} else {

							jwt.verify(token, HConfig.TOKEN_SECRET, (error, user) => {
								if (error) {
									console.log(error);
								}  
								req.user = user;
						
							});

							saveOrder(token)
							//console.log(token)
							// res.send({
							// 	token:token,
							// 	user: dataToStore
							// });
						}
					});
				}

				createTokenSendResponse(user);
				// const dataToStore = {
				// 	  	userName: req.body.userName,
				// 	  	mobileNumber:req.body.mobileNumber,
				// 	  	fullAddress:req.body.fullAddress,
				// 	  	imageUrl: req.file.url,
				// 	  	userId: req.user._id
				// }
				// there is already a user in the db with this username...
				// respond with an error!
				// let newOrder = new orderDb(dataToStore);
				// newOrder.save(function(err, task){ //call the save method on the instance of the model in a callback way
				// 	console.log('coollll--')
				// 	if(err){
				// 		res.send(err);
				// 	} else {
				// 		res.send({ data: task });
				// 	}
						
				// });
			} else {
				// hash the password
				bcrypt.hash(req.body.mobileNumber.trim(), 12).then(hashedPassword => {
					// insert the user with the hashed password
					const userToStore = {
						userName: req.body.userName,
						mobileNumber: req.body.mobileNumber,
						mobileNumberAsPass: hashedPassword
					};


					console.log(userToStore)

					let newUsers = new usersDb(userToStore);
					//newOrder.save(function(err, task){

					newUsers.save((err, insertedUser)=>{

						if (err) return false
						// console.log(insertedUser.userName)
						console.log(insertedUser)
						//console.log(insertedUser.userName)
						
						function createTokenSendResponse(userDetails) {
							const payload = {
								_id: userDetails._id,
								userName: userDetails
							};
							req.user = userDetails;
							jwt.sign(payload, HConfig.TOKEN_SECRET, {
								expiresIn: '365d'
							}, (err, token) => {
								if (err) {
									console.log(err)
									respondError422(res, next);
								} else {

									jwt.verify(token, HConfig.TOKEN_SECRET, (error, user) => {
										if (error) {
											console.log(error);
										}  
										req.user = user;
								
									});

									saveOrder(token)
									//console.log(token)
									// res.send({
									// 	token:token,
									// 	user: dataToStore
									// });
								}
							});
						}

						createTokenSendResponse(insertedUser);
					});
				});
			}
		});
	} else {
		res.status(422);
		next(result.error);
	}






	function saveOrder(token){
		const dataToStore = {
			  	userName: req.body.userName,
			  	mobileNumber:req.body.mobileNumber,
			  	fullAddress:req.body.fullAddress,
			  	imageUrl: req.file.secure_url,
			  	userId: req.user._id
		}
		let newOrder = new orderDb(dataToStore);
		newOrder.save(function(err, task){ //call the save method on the instance of the model in a callback way
			
			if(err){
				res.send(err);
			} else {
				//console.log('coollll--')
				//console.log(task)
				
				res.send({token:token, user: dataToStore });
			}
		
		});
	}
	

	

	// Image.create(image) // save image information in database
	//   .then(newImage => res.json(newImage))
	//   .catch(err => console.log(err));
});

router.get("/", function(req, res) {
	console.log('get--ord')
	//console.log(req.user)
	console.log(req.user._id)
	orderDb.find({userId: req.user._id}).sort({_id:-1}).exec( function(err, orders){

	        if(err) {
	        	res.send(err).status(200);
	        } else {
	        	console.log('orders')
	        	console.log(orders)
	        	res.json(orders);
	        }
	            
	        
	    });
	// res.send({ 
	// 	data: { 
	// 		orders:[
	// 			{
	// 				id: '#10101001011',
	// 				date:'23/oct/2018',
	// 				status: 'Placed',
	// 				image_url: 'https://images-eu.ssl-images-amazon.com/images/I/51ZAWZSin9L._SX180_.jpg',
	// 			},
	// 			{
	// 				id: '#1010106868gh',
	// 				date:'23/oct/2018',
	// 				status: 'Accepted',
	// 				image_url: 'https://images-eu.ssl-images-amazon.com/images/I/41O4cCf8V2L._SY180_.jpg',
	// 			},
	// 			{
	// 				id: '#1010100ghjku',
	// 				date:'23/oct/2018',
	// 				status: 'OutForDelivery',
	// 				image_url: 'https://images-eu.ssl-images-amazon.com/images/I/31yRv3ugXXL._SY180_.jpg',
	// 			},
	// 			{
	// 				id: '#1010100ghjkum',
	// 				date:'23/oct/2018',
	// 				status: 'Delivered',
	// 				image_url: 'https://images-eu.ssl-images-amazon.com/images/I/31yRv3ugXXL._SY180_.jpg',
	// 			}
	// 		] 
	// 	}
	// });
});

// router.get('/', function(req, res) {
//     //Todo.find(function(err, results) {
//        // if (err) { console.log(err); }

//         res.send({ orders: orders });
//     });
// });


// router.post('/', function(req, res) {
//     var todo = new Todo(req.body);
//     todo.save(function(err) {
//         if (err) { console.log(err); }

//         res.send('ToDo saved');
//     });
// });

// router.put('/:id', function(req, res) {
//     var id = req.params.id;
//     Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
//         $set: { task: req.body.task }
//     }, function(err) {
//         if (err) { console.log(err); }

//         res.send('ToDo updated');
//     });
// });

// router.delete('/:id', function(req, res) {
//     var id = req.params.id;
//     Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
//         if (err) { console.log(err); }

//         res.send('ToDo deleted');
//     });
// });
router.put('/:id', (req, res, next) => {
	const reqbody = req.body;
	console.log('reqbody')
	console.log(reqbody)
	if (!req.user && !reqbody.reason ) return false
	const dataToStore = {
		canceledBy: req.user,
		date: new Date(),
		reason: reqbody.reason
	} 
	console.log(req.params.id)
	const paramId = req.params.id
	orderDb.findOneAndUpdate({_id: paramId },{status:"canceled", cancellation: dataToStore}, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})
module.exports = router;