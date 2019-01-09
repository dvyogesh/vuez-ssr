const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const bannerSchema = Schema({
	homePage: Object,
	ordersPage: {
    	type:Object
	}
});

const slidesSchema = Schema({
	homePage: Object,
	ordersPage: Array,
});

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
	banners: {
		type: Object,
		ref: 'Banners' 
	},
	slides: {type: [{type:mongoose.Schema.Types.Mixed, ref: 'Slides'}]
	}

});

const Banners  = mongoose.model('Banners', bannerSchema);
const Slides = mongoose.model('Slides', slidesSchema);

module.exports = mongoose.model('Cms', CmsSchema);