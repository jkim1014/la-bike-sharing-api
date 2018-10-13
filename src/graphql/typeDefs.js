const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    user(id: ID!): User
  }
  type User {
    id: ID!
    email: String!
  }
  type Mutation {
    loginUser(email: String!, password: String!): LoginUserReturn!
    registerUser(email: String!, password: String!): RegisterUserReturn!
  }
  type LoginUserReturn {
    token: String
    user: User
    error: String
  }
  type RegisterUserReturn {
    token: String
    user: User
    error: String
  }
`
