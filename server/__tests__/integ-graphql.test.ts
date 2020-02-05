import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import mockData from './mocks/mock-data';
import * as controllers from '../src/controllers';
import { constructTestServer } from './__utils';
const {
	//Generic
	getAllDataDB,
	getByIDDB,
	DeleteRecordByIDDB,
	//User
	createCreateUserDB,
	updateUserByIDDB,
	//Supplie
	createCreateSupplierDB,
	updateSupplierByIDDB,
} = controllers;

//User

const userMock = {
	insert: jest.fn(async input => {
		return { id: '1', ...input };
	}),
	getById: jest.fn(async id => {
		const filterData = data => {
			if (data.id === id) {
				return data;
			}
		};
		const res = mockData.users.filter(filterData);

		return res[0] || null;
	}),
	getAll: jest.fn(async () => {
		return mockData.users;
	}),
	updateById: jest.fn(async input => {
		return { ...input };
	}),
	deleteById: async id => {
		const filterData = data => {
			if (data.id === id) {
				return data;
			}
		};
		const res = mockData.users.filter(filterData);
		return res[0] || null;
	},
};

//Supplier

const supplierMock = {
	insert: jest.fn(async input => {
		return { id: '1', ...input };
	}),
	getAll: jest.fn(async () => {
		return mockData.suppliers;
	}),
	getById: jest.fn(async id => {
		const filterData = cust => {
			if (cust.id === id) {
				return cust;
			}
		};

		const res = mockData.suppliers.filter(filterData);
		return res[0] || null;
	}),

	deleteById: async id => {
		const filterData = cust => {
			if (cust.id === id) {
				return cust;
			}
		};

		const res = mockData.suppliers.filter(filterData);
		return res[0] || null;
	},

	updateById: jest.fn(async input => {
		return { ...input };
	}),
};

const { server }: any = constructTestServer({
	context: {
		//User
		createUser: createCreateUserDB(userMock),
		getUserById: getByIDDB(userMock),
		getAllUser: getAllDataDB(userMock),
		deleteUserById: DeleteRecordByIDDB(userMock),
		updateUserById: updateUserByIDDB(userMock),
		//Supplier
		createSupplier: createCreateSupplierDB(supplierMock),
		getSupplierById: getByIDDB(supplierMock),
		getAllSuppliers: getAllDataDB(supplierMock),
		deleteSupplierById: DeleteRecordByIDDB(supplierMock),
		updateSupplierById: updateSupplierByIDDB(supplierMock),
	},
});

describe('Queries', () => {
	//User Queries
	it('should fetch all user', async () => {
		const USER_ALL = gql`
			query {
				allUsers {
					id
					name
				}
			}
		`;

		const { query } = createTestClient(server);
		const res = await query({ query: USER_ALL });

		expect(res).toMatchSnapshot();
	});

	it('should fetch one user', async () => {
		const SINGLE_USER = gql`
			query u($id: String!) {
				user(id: $id) {
					name
				}
			}
		`;

		const { query } = createTestClient(server);
		const res = await query({
			query: SINGLE_USER,
			variables: { id: '1' },
		});

		expect(res).toMatchSnapshot();
	});

	it('should error when no user', async () => {
		const SINGLE_USER = gql`
			query u($id: String!) {
				user(id: $id) {
					name
				}
			}
		`;

		const { query } = createTestClient(server);
		const res = await query({
			query: SINGLE_USER,
			variables: { id: '' },
		});

		expect(res).toMatchSnapshot();
	});

	//Supplier Queries
	it('should fetch all suppliers', async () => {
		const SUPPLIER_ALL = gql`
			query {
				allSuppliers {
					name
					address {
						id
					}
				}
			}
		`;

		const { query } = createTestClient(server);
		const res = await query({ query: SUPPLIER_ALL });

		expect(res).toMatchSnapshot();
	});

	it('should fetch one supplier', async () => {
		const SINGLE_SUPPLIER = gql`
			query supp($id: ID!) {
				supplier(id: $id) {
					name
				}
			}
		`;

		const { query } = createTestClient(server);
		const res = await query({
			query: SINGLE_SUPPLIER,
			variables: { id: '1' },
		});

		expect(res).toMatchSnapshot();
	});

	it('should error when no supplier', async () => {
		const SINGLE_SUPPLIER = gql`
			query supp($id: ID!) {
				supplier(id: $id) {
					name
				}
			}
		`;

		const { query } = createTestClient(server);
		const res = await query({
			query: SINGLE_SUPPLIER,
			variables: { id: '' },
		});

		expect(res).toMatchSnapshot();
	});

	//Mutations

	//User Mutations
	it('create a user', async () => {
		const CREATE_USER = gql`
			mutation createUser($name: String) {
				createUser(name: $name) {
					id
					name
				}
			}
		`;

		const { mutate } = createTestClient(server);
		const res = await mutate({
			mutation: CREATE_USER,
			variables: {
				name: 'User 1',
			},
		});

		expect(res.errors).toBeUndefined();
		expect(userMock.insert.mock.calls.length).toBe(1);
		expect(res.data).toMatchObject({
			createUser: {
				id: '1',
				name: 'User 1',
			},
		});
		expect(res).toMatchSnapshot();
	});

	it('delete a user', async () => {
		const DELETE_USER = gql`
			mutation u($id: String!) {
				deleteUser(id: $id) {
					id
					name
				}
			}
		`;
		const { mutate } = createTestClient(server);
		const res = await mutate({
			mutation: DELETE_USER,
			variables: { id: 'U1' },
		});
		expect(res.errors).toBeUndefined();
		expect(res).toMatchSnapshot();
	});

	it('update a user', async () => {
		const UPDATE_USER = gql`
			mutation u($name: String!) {
				updateUser(name: $name) {
					name
				}
			}
		`;
		const { mutate } = createTestClient(server);
		const res = await mutate({
			mutation: UPDATE_USER,
			variables: {
				id: '1',
				name: 'User 1',
			},
		});
		expect(res.errors).toBeUndefined();
		expect(res).toMatchSnapshot();
	});

	//Supplier Mutation
	it('create a supplier', async () => {
		const CREATE_SUPPLIER = gql`
			mutation createSupp($supplier: SupplierInput!) {
				createSupplier(supplier: $supplier) {
					id
					name
				}
			}
		`;

		const { mutate } = createTestClient(server);
		const res = await mutate({
			mutation: CREATE_SUPPLIER,
			variables: {
				supplier: {
					name: 'The Supplier',
					address: {
						building_name: 'bu',
						street: 'St',
						city: 'cty',
						state: 'stat',
						zip_code: 'zip',
					},
				},
			},
		});

		expect(res.errors).toBeUndefined();
		expect(supplierMock.insert.mock.calls.length).toBe(1);
		expect(res.data).toMatchObject({
			createSupplier: {
				id: '1',
				name: 'The Supplier',
			},
		});
		expect(res).toMatchSnapshot();
	});

	it('update a supplier', async () => {
		const UPDATE_SUPPLIER = gql`
			mutation supp($supplier: UpdateSupplierInput!) {
				updateSupplier(supplier: $supplier) {
					id
					name
					address {
						building_name
						street
					}
				}
			}
		`;

		const { mutate } = createTestClient(server);
		const res = await mutate({
			mutation: UPDATE_SUPPLIER,
			variables: {
				customer: {
					id: '5dae933089d8fe07b8c6da18',
					name: 'New name for this one',
					address: 'A1',
				},
			},
		});

		expect(res).toMatchSnapshot();
	});

	it('delete a supplier', async () => {
		const DELETE_SUPPLIER = gql`
			mutation supp($id: ID!) {
				deleteSupplier(id: $id) {
					name
				}
			}
		`;

		const { mutate } = createTestClient(server);
		const res = await mutate({
			mutation: DELETE_SUPPLIER,
			variables: { id: 'S1' },
		});

		expect(res).toMatchSnapshot();
	});
});
