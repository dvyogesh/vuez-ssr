const jwt = require('jsonwebtoken');
import isEmpty from "lodash/isEmpty";

function checkTokenSetUser(req, res, next) {
	const authHeader = req.get('authorization');
	//const header = req.headers['authorization'];
	const newUser = req.get('newUser');
	// if(typeof header !== 'undefined') {
	//         const bearer = header.split(' ');
	//         const token = bearer[1];

	//         req.token = token;
	//         next();
	//     } else {
	//         //If header is undefined return Forbidden (403)
	//         res.sendStatus(403)
	//     }
	// console.log('newUser')
	// console.log(newUser)
	// console.log(isEmpty(newUser))
	
	//console.log(userSplit)
	if (authHeader && isEmpty(newUser) ) {
		console.log('enterd')
		const token = authHeader.split(' ')[1];
		// console.log(authHeader)
		// console.log(token)
		if (token && token !== null) {
			jwt.verify(token, HConfig.TOKEN_SECRET, (error, user) => {
				if (error) {
					console.log(error);
				}  
				req.user = user;
				next();
			});

		} else {
			next();
		}
	} else if (authHeader && authHeader.split(' ')[1] !== 'newUserOrder') {
		console.log('enterd222')
		const token = authHeader.split(' ')[1];
		console.log(authHeader)
		console.log(token)
		if (token && token !== null) {
			jwt.verify(token, HConfig.TOKEN_SECRET, (error, user) => {
				if (error) {
					console.log(error);
				}  
				req.user = user;
				next();
			});

		} else {
			next();
		}
	}else if (newUser && newUser.split(' ')[1]  !== '') {
		req.user = newUser;
		next();
	}  
	else {
		next();
	}
}

function isLoggedIn(req, res, next) {
	console.log('req.user::')
	//console.log(req)
	console.log(req.user)
	if (req.user) {
		next();
	} else {
		const error = new Error('🚫 Un-Authorized 🚫');
		res.status(401);
		next(error);
	}
}

module.exports = {
	checkTokenSetUser,
	isLoggedIn
};