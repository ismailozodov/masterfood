import { gql } from 'apollo-server'


export default gql`
    extend type Query {
        tables: [Table!]!
    }

    extend type Mutation {
        addTable(tableNumber: Int!): MutationResponse!
        deleteTable(tableId: ID!): MutationResponse!
    }

    type Table {
        tableId: ID!
        tableNumber: Int!
        tableBusy: Boolean!
        order: Order!
    }
`