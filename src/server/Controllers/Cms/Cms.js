const express = require('express');
const Joi = require('joi');

const mongoose = require('mongoose');
const CmsDB = mongoose.model('Cms');

//import  {isLoggedIn} from '../Auth/middlewares';


const schema = Joi.object().keys({
	title: Joi.string().trim().max(100).required(),
	note: Joi.string().trim().required()
});

const router = express.Router();

router.get('/home', (req, res) => {
	//console.log(req)
	console.log('isLoggedIn(req, res)')
	//console.log(req.user._id)
	CmsDB.find({}, function(err, Cms){
		if (err) {
			console.log(err)
		} else {
			console.log(Cms)
			//res.json(notes);
			res.send(Cms);
		}
	})
});

router.post('/home/banner', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const {bannerUrl, altText, actionLink } = req.body
	const dataToStore = {
	  	banners: {
	  		homePage: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		}
	  	}
	}

	let Cms = new CmsDB(dataToStore);
	Cms.save(function(err, banner){
		if(err){
			res.send(err);
		} else {
			res.send(banner);
		}
	})

})
router.post('/home/slider', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	// const {slideImgurl, slideActionlink, textOnSlide } = req.body
	const dataToStore = {
	  	slides: {
	  		homePage: req.body
	  	}
	}

	let Cms = new CmsDB(dataToStore);
	Cms.save(function(err, banner){
		if(err){
			res.send(err);
		} else {
			res.send(banner);
		}
	})

})

router.put('/home/banner', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const {bannerUrl, altText, actionLink, id } = req.body
	const dataToStore = {
	 //banners: {
	  		homePage: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		}
	  	}
	//}

	//let Cms = new CmsDB(id);
	CmsDB.findByIdAndUpdate({_id: id},{$set:{banners: dataToStore}},{new: true}, function(err, banner){
		if(err){
			res.send(err);
		} else {
			res.send(banner);
		}
	})

})

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
//});

module.exports = router;