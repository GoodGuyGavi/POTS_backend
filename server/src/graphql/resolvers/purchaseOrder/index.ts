const purchaseOrderResolvers = {
	PurchaseOrder: {
		supplierStatus: async (parent, args, context, info) => {
			const { getAllSupplierStatus } = context;
			return await getAllSupplierStatus(parent.supplierStatus.id);
		},
		supplier: async (parent, args, context, info) => {
			const { getSupplierById } = context;
			return await getSupplierById(parent.supplier);
		},
		items: async (parent, args, context, info) => {
			const { getAllItems } = context;

			return await getAllItems(parent.items.id);
		},
	},
	Query: {
		allPurchaseOrders: async (parent, args, context, info) => {
			const { getAllPurchaseOrders } = context;
			return getAllPurchaseOrders();
		},
		purchaseOrder: async (parent, { driver }, context, info) => {
			const { getDeliveryByDriver } = context;
			return getDeliveryByDriver(driver);
		},
	},
	Mutation: {
		createPurchaseOrder: async (parent, { purchaseOrder }, context, info) => {
			const { createPurchaseOrder, createSupplier, createSupplierStatus, createItem } = context;

			const supplier = await createSupplier(purchaseOrder.supplier);

			const supplierStatus: Array<any> = await Promise.all(
				purchaseOrder.supplierStatus.map(async ss => {
					const poss = await createSupplierStatus(ss);
					return poss.id.toString();
				})
			);

			const items: Array<any> = await Promise.all(
				purchaseOrder.items.map(async item => {
					const poitem = await createItem(item);
					return poitem.id.toString();
				})
			);

			const po = {
				externalID: purchaseOrder.externalID,
				status: purchaseOrder.status,
				supplierStatus: supplierStatus,
				supplier: supplier.id,
				items: items,
			};

			return await createPurchaseOrder(po);
		},
		deletePurchaseOrder: async (parent, { id }, context, info) => {
			const { deletePurchaseOrderbyId } = context;
			return await deletePurchaseOrderbyId(id);
		},
		updatePurchaseOrder: async (parent, { purchaseOrder }, context, info) => {
			const { updatePurchaseOrderByID } = context;
			return await updatePurchaseOrderByID(purchaseOrder);
		},
	},
};

export default purchaseOrderResolvers;
