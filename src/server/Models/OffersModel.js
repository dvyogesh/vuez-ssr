const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffersSchema = new Schema({
	offerHtml:String,
	offerName: String,
	offerParam: String,
	offerImage: String
});
module.exports = mongoose.model('OffersPages', OffersSchema);