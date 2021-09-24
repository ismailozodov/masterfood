import { gql } from 'apollo-server'


export default gql`
    extend type Query {
        steaks(steakId: ID): [Steak!]!
    }

    extend type Mutation {
        addSteak(steakName: String! steakPrice: Int! steakImg: String!): MutationResponse!
        deleteSteak(steakId: ID!): MutationResponse!
        updateSteak(steakId: ID! steakName: String  steakPrice: Int): MutationResponse!
    }

    type Steak {
        steakId: ID!
        steakName: String!
        steakPrice: Int!
        steakImg: String!
    }
`