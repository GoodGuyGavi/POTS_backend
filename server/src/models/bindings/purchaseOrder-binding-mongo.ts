import { IDBModel } from '../../commons/types';
import { PurchaseOrder, SupplierStatus, Supplier, Item } from '../mongo-models';

const purchaseOrderModel: IDBModel<any> = {
	insert: async purchaseOrder => {
		const newPO = await new PurchaseOrder({
			purchaseOrderNo: purchaseOrder.purchaseOrderNo,
			shipmentNo: purchaseOrder.shipmentNo,
			status: purchaseOrder.status,
			supplierStatus: purchaseOrder.supplierStatus,
			supplier: purchaseOrder.supplier,
			items: purchaseOrder.items,
		});

		return new Promise((resolve, reject) => {
			newPO.save((err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
	},

	getAll: async () => {
		const po: any = await PurchaseOrder.find({}).exec();

		return po.map(u => ({
			id: u._id.toString(),
			purchaseOrderNo: u.purchaseOrderNo,
			shipmentNo: u.shipmentNo,
			status: u.status,
			supplierStatus: u.supplierStatus,
			supplier: u.supplier,
			items: u.items,
		}));
	},

	getById: async id => {
		const u: any = await PurchaseOrder.findOne({ _id: id }).exec();

		return {
			id: u._id.toString(),
			purchaseOrderNo: u.purchaseOrderNo,
			shipmentNo: u.shipmentNo,
			status: u.status,
			supplierStatus: u.supplierStatus,
			supplier: u.supplier,
			items: u.items,
		};
	},

	getAllByItem: async data => {
		const item: any = await Item.find({ _id: { $in: data } }).exec();

		return item.map(i => ({
			id: i._id.toString(),
			itemNo: i.itemNo,
			productId: i.productId,
			description: i.description,
			quantity: i.quantity,
			totalAmount: i.totalAmount,
			uom: i.uom,
			unitPrice: i.unitPrice,
			deliveryAddress: i.deliveryAddress,
			deliveryDate: i.deliveryDate,
			supplierStatus: i.supplierStatus,
			currency: i.currency,
			dateUpdated: i.dateUpdated,
			timeUpdated: i.timeUpdated,
		}));
	},

	getAllBySupplierStatus: async data => {
		const supplierStatus: any = await SupplierStatus.find({ _id: { $in: data } }).exec();

		return supplierStatus.map(ss => ({
			id: ss._id.toString(),
			status: ss.status,
			dateCreated: ss.dateCreated,
			timeCreated: supplierStatus.timeCreated,
		}));
	},

	getAllByScheduleLine: async data => {},

	deleteById: async id => {
		return new Promise((resolve, reject) => {
			PurchaseOrder.findByIdAndDelete(id).exec((err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
	},
	updateById: async purchaseOrder => {
		return new Promise((resolve, reject) => {
			PurchaseOrder.findByIdAndUpdate({ _id: purchaseOrder.id }, { $set: { ...purchaseOrder } }, { new: true }).exec(
				(err, res) => {
					err ? reject(err) : resolve(res);
				}
			);
		});
	},
};

export { purchaseOrderModel };
