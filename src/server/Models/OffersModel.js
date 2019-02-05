const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffersSchema = new Schema({
	offerHtml:String,
	offerName: String,
	offerParam: String,
	offerImage: String
});
// NEED TO PUT THIS MODEL IN CMS MODEL LIKE "SiteTicker" model
module.exports = mongoose.model('OffersPages', OffersSchema);
