import { IDBModel } from '../../commons/types';
import { SupplierStatus } from '../mongo-models';

const supplierStatusModel: IDBModel<any> = {
	insert: async supplierStatus => {
		const newSupplierStatus = await new SupplierStatus({
			status: supplierStatus.status,
			dateCreated: supplierStatus.dateCreated,
		});

		return new Promise((resolve, reject) => {
			newSupplierStatus.save((err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
	},

	getById: async id => {
		const supplierStatus: any = await SupplierStatus.findOne({ _id: id }).exec();
		if (!supplierStatus._id) {
			throw new Error('No supplierStatus found');
		}
		return {
			id: supplierStatus._id.toString(),
			status: supplierStatus.status,
			dateCreated: supplierStatus.dateCreated,
		};
	},

	getAll: async () => {
		const supplierStatus: any = await SupplierStatus.find({}).exec();

		return supplierStatus.map(u => ({
			id: supplierStatus._id.toString(),
			status: supplierStatus.status,
			dateCreated: supplierStatus.dateCreated,
		}));
	},

	deleteById: async id => {
		return new Promise((resolve, reject) => {
			SupplierStatus.findByIdAndDelete(id).exec((err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
	},

	updateById: async data => {
		const supplierStatus: any = await SupplierStatus.findByIdAndUpdate(
			{
				_id: data.id,
			},
			{
				status: data.status,
				dateCreated: data.dateCreated,
			},
			{
				new: true,
			}
		).exec();
		return {
			id: supplierStatus._id,
			status: supplierStatus.status,
			dateCreated: supplierStatus.dateCreated,
		};
	},
};

export { supplierStatusModel };
