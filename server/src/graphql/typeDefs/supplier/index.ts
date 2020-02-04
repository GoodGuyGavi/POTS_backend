import { gql } from 'apollo-server';

const suppliertypeDefs = gql`
	type Customer {
		id: ID!
		name: String!
		address: Address!
	}

	type Query {
		supplier(id: ID!): Supplier!
		allSuppliers: [Supplier!]!
	}

	type Mutation {
		createSupplier(supplier: SupplierInput): Supplier
		deleteSupplier(id: ID!): Supplier
		updateSupplier(customer: UpdateSupplierInput): Supplier
	}

	input SupplierInput {
		name: String!
		address: AddressInput!
	}

	input UpdateSupplierInput {
		id: ID!
		name: String!
		address: ID!
	}
`;

export default suppliertypeDefs;
