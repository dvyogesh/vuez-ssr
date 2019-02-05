const express = require('express');
const Joi = require('joi');

const mongoose = require('mongoose');
const CmsDB = mongoose.model('Cms');
const OffersDB = mongoose.model('OffersPages');
const SiteTickerDB = mongoose.model('SiteTicker');
const BlogsDB = mongoose.model('Blogs');
const BannersDB = mongoose.model('Banners');



//const UserDB = mongoose.model('Uzer');


//import  {isLoggedIn} from '../Auth/middlewares';


const schema = Joi.object().keys({
	title: Joi.string().trim().max(100).required(),
	note: Joi.string().trim().required()
});

const router = express.Router();

router.get('/home', (req, res) => {
	// var request = require("request");

	// var options = { method: 'POST',
	//   url: 'https://mercury-uat.phonepe.com/v3/debit',
	//   headers: 
	//    { 'x-verify': 'ew0KIm1lcmNoYW50SWQiOiAiTTIzMDYxNjA0ODMyMjA2NzU1NzkxNDAiDQp9"/v3/debit"8289e078-be0b-484d-ae60-052f117f8deb###1',
	//      'content-type': 'application/json' },
	//   body: 
	//    { request: 'ew0KIm1lcmNoYW50SWQiOiAiTTIzMDYxNjA0ODMyMjA2NzU1NzkxNDAiDQp9' },
	//   json: true };

	// request(options, function (error, response, body) {
	//   if (error) throw new Error(error);
	// 	console.log('body=======');
	//   console.log(body);
	//   console.log('body=======');
	//   console.log(response)
	// });

	var request = require("request");

	var options = { method: 'GET',
		url: 'https://mercury-uat.phonepe.com/v3/account/token/M2306160483220675579140/M23061604832206755791408c38b65b84314a3293b8eb9a5ad43079/debit/suggest',
		headers: 
   { 'x-verify': '73d07ad1f4f67e33c881f724a435dccb7fdca6417fd28af609e736311911d28c###1',
   	'content-type': 'application/json' } };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		console.log('body=======');
		console.log(body);
	});
	//console.log(req)
	console.log('isLoggedIn(req, res)')
	//console.log(req.user._id)
	CmsDB.find({},
		//)
	//.populate("banners").exec(
		function(err, data){
			res.send(data);
		})
	// CmsDB.find({}, function(err, homeBanner){
	// 	//BannersDB.find({},function(err, Cms){
	// 	if (err) {
	// 		console.log(err)
	// 	} else {
	// 		//console.log(Cms)
	// 		//res.json(notes);
	// 		res.send(homeBanner);
	// 	}
	// 	//})
	// })
	
	
});

router.post('/home/banner', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const {bannerUrl, altText, actionLink } = req.body
	const dataToStore = {
	  		//homeBanner: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		//}
	}
	// var hex = /[0-9A-Fa-f]{6}/g;
	// var ObjectIdmongoose.Types.ObjectId
	// id = (hex.test('bannerData')) ? ObjectId('bannerData') : 'bannerData';
	// collection.findOne({'_id':new ObjectID(id)}, function(error,doc) {

	//let homeBanner = CmsDB(dataToStore);
	CmsDB.update({},{$set:{homeBanner: dataToStore}},{upsert: true, new: true}, function(err, banner){
	//homeBanner.save(
		//{$set:{homePage: dataToStore}}, {upsert: true, new: true},
		 //function(err, banner){
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
	  		//homePage: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		//}
	  	}
	//}

	//let Cms = new CmsDB(id);
	CmsDB.update({},{$set:{homeBanner: dataToStore}},{upsert: true, new: true}, function(err, banner){
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
	

	//let homeSlider = CmsDB({homeSlides:req.body});
	//homeSlider.save(

	CmsDB.update({},{$set:{homeSlides: req.body }},{upsert: true, new: true},function(err, slider){
		//function(err, slider){
		if(err){
			res.send(err);
		} else {
			res.send(slider);
		}
	})

})

router.post('/offer/createPage', (req, res, next) => {
	const reqbody = req.body;
	const dataToStore = {
		offerHtml: reqbody.offerHtml,
		offerName: reqbody.offerName,
		offerImage: reqbody.offerImage,
		offerParam: reqbody.offerName.replace(/[^A-Z0-9]/ig, "-")//split(' ').join('-')// replace(/[^A-Z0-9]/ig, "-")
	} 
	let Offers = new OffersDB(dataToStore);
	Offers.save(function(err, offer){
		if(err){
			res.send(err);
		} else {
			res.send(offer);
		}
	})

})

router.get('/offer/pages', (req, res, next) => {
	OffersDB.find({}, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.get('/offer/:id', (req, res, next) => {
	
	const paramId = req.params.id
	OffersDB.findOne({offerParam: paramId }, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.put('/offer/:id', (req, res, next) => {
	const reqbody = req.body;
	const dataToStore = {
		offerHtml: reqbody.offerHtml,
		offerName: reqbody.offerName,
		offerImage: reqbody.offerImage,
		offerParam: reqbody.offerName.replace(/[^A-Z0-9]/ig, "-")//split(' ').join('-')// replace(/[^A-Z0-9]/ig, "-")
	} 
	console.log(req.params.id)
	const paramId = req.params.id
	OffersDB.findOneAndUpdate({_id: paramId }, dataToStore, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.delete('/offer/:id', (req, res, next) => {
	const reqbody = req.body;
	console.log(req.params.id)
	const paramId = req.params.id
	OffersDB.remove({_id: paramId }, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.post('/siteTicker/create', (req, res, next) => {
	const reqbody = req.body;
	console.log('req.body')
	const dataToStore = {
		promoLink: reqbody.promoLink,
		propmoHtml: reqbody.propmoHtml,
	} 
	let SiteTicker = new SiteTickerDB(dataToStore);
	SiteTicker.save(function(err, offer){
		if(err){
			res.send(err);
		} else {
			res.send(offer);
		}
	})

})

router.get('/siteTicker/list', (req, res, next) => {
	SiteTickerDB.find({}, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.put('/siteTicker/:id', (req, res, next) => {
	console.log('put----')
	const reqbody = req.body;
	const dataToStore = {
		promoLink: reqbody.promoLink,
		propmoHtml: reqbody.propmoHtml,
	} 
	console.log(req.params.id)
	const paramId = req.params.id
	SiteTickerDB.findOneAndUpdate({_id: paramId }, dataToStore, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.delete('/siteTicker/:id', (req, res, next) => {
	const reqbody = req.body;
	console.log(req.params.id)
	const paramId = req.params.id
	console.log('delete----')
	SiteTickerDB.remove({_id: paramId }, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})





router.post('/blogs', (req, res, next) => {
	const reqbody = req.body;
	const dataToStore = {
		blogName: reqbody.blogName,
		blogHtml: reqbody.blogHtml,
		blogImage: reqbody.blogImage,
		blogParam: reqbody.blogName.replace(/[^A-Z0-9]/ig, "-")//split(' ').join('-')// replace(/[^A-Z0-9]/ig, "-")
	} 
	let Blogs = new BlogsDB(dataToStore);
	Blogs.save(function(err, offer){
		if(err){
			res.send(err);
		} else {
			res.send(offer);
		}
	})

})

router.get('/blogs', (req, res, next) => {
	BlogsDB.find({}, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.get('/blogs/:id', (req, res, next) => {
	console.log('req.body')
	console.log(req.params.id)
	const paramId = req.params.id
	BlogsDB.findOne({blogParam: paramId }, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.put('/blogs/:id', (req, res, next) => {
	const reqbody = req.body;
	const dataToStore = {
		blogName: reqbody.blogName,
		blogHtml: reqbody.blogHtml,
		blogImage: reqbody.blogImage,
		blogParam: reqbody.blogName.replace(/[^A-Z0-9]/ig, "-")//split(' ').join('-')// replace(/[^A-Z0-9]/ig, "-")
	} 
	console.log(req.params.id)
	const paramId = req.params.id
	BlogsDB.findOneAndUpdate({_id: paramId }, dataToStore, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.delete('/blogs/:id', (req, res, next) => {
	const reqbody = req.body;
	console.log(req.params.id)
	const paramId = req.params.id
	BlogsDB.remove({_id: paramId }, function(err, page){
		if (err) {
			console.log(err)
		} else {
			//console.log(Cms)
			//res.json(notes);
			res.send(page);
		}
	})

})

router.post('/myorders/banner', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const {bannerUrl, altText, actionLink } = req.body
	const dataToStore = {
	  	//banners: {
	  		//myOrdersPage: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		//}
	  	//}
	}

	//let Banner = new BannersDB(dataToStore);
	BannersDB.update({},{$set:{myOrdersPage: dataToStore}}, {upsert: true, new: true}, function(err, banner){
	//Banner.save(function(err, banner){
		if(err){
			res.send(err);
		} else {
			res.send(banner);
		}
	})

})

router.put('/myorders/banner', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const {bannerUrl, altText, actionLink, id } = req.body
	const dataToStore = {
	 //banners: {
	  		//myordersPage: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		//}
	  	}
	//}

	//let Cms = new CmsDB(id);
	BannersDB.update({},{$set:{myOrdersPage: dataToStore}}, {upsert: true, new: true}, function(err, banner){
		if(err){
			res.send(err);
		} else {
			res.send(banner);
		}
	})

})

router.get('/myorders/banner', (req, res, next) => {
	console.log('req.body')
	console.log(req.body)
	const {bannerUrl, altText, actionLink, id } = req.body
	const dataToStore = {
	 //banners: {
	  		myordersPage: {
	  			bannerUrl:bannerUrl,
	  			altText:altText,
	  			actionLink:actionLink
	  		}
	  	}
	//}

	//let Cms = new CmsDB(id);
	BannersDB.find({}, function(err, banner){
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