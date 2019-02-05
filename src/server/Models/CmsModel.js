const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bannerSchema = Schema({
	homePage:  {
    	type:Object
	},
	myOrdersPage: {
    	type:Object
	}
});

const slidesSchema = Schema({
	homePage: Object,
	myOrdersPage: Array,
});

const siteTickerSchema = Schema({
	promoLink: String,
	propmoHtml: String,
});

const BlogsSchema = new Schema({
	blogName:String,
	blogHtml: String,
	blogParam: String,
	blogImage: String
});
// NEED TO PUT THIS MODEL IN CMS MODEL LIKE "SiteTicker" model
const Blog = mongoose.model('Blogs', BlogsSchema);

const SiteTicker = mongoose.model('SiteTicker', siteTickerSchema);
// const personSchema = Schema({
//     firstname: String,
//     lastname: String,
//     email: String,
//     gender: {type: String, enum: ["Male", "Female"]}
//     dob: Date,
//     city: String,
//     banner: [{ type: Schema.Types.ObjectId, ref: 'Banner' }],
//     slides: [{ type: Schema.Types.ObjectId, ref: 'Slides' }]
// });
const Banners  = mongoose.model('Banners', bannerSchema);
const Slides = mongoose.model('Slides', slidesSchema);


const CmsSchema = new Schema({
	title: {
		type:String,
	},
	note: {
		type:String,
	},
	userId: {
		type:String,
	},
	mainBanner: {
		type: Object,
	},
	homeBanner: { type: Object},
	homeSlides: { type: Array}
	
});

module.exports = mongoose.model('Cms', CmsSchema);
//export default {cms, OfferSchema
