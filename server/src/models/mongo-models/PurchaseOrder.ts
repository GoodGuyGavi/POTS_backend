import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
	return this.toString();
};

const PurchaseOrderSchema = new Schema({
	externalID: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	supplierStatus: {
		type: [String],
	},
	supplier: {
		type: String,
		required: true,
	},
	items: {
		type: [String],
		required: true,
	},
});

export default mongoose.model('PurchaseOrder', PurchaseOrderSchema);
