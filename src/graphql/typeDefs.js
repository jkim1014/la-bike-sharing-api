const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    trip(id: ID!): Trip
    station(id: ID!): Station
    topTenStartStations: [Station!]!
    topTenStopStations: [Station!]!
    averageTripDuration(planDuration: PlanDuration!): Float!
    averageDistanceTravelled(oneWay: Bool!): Float!
    breakDown(input: BreakDownInput!): BreakDownReturn!
    seasonal(season: String!): SeasonalReturn!
    mostUsedBike: Bike!
  }
  type Mutation {
    parseData: ParseDataReturn!
  }
  type Trip {
    id: ID!
    duration: Int!
    startTime: String!
    endTime: String!
    startStation: Station!
    endStation: Station!
    planDuration: Int!
    isOneWay: Boolean!
    bike: Bike!
  }
  type Station {
    id: ID!
    latitude: Float!
    longitude: Float!
  }
  type Bike {
    id: ID!
  }
  type ParseDataReturn {
    success: Boolean!
    error: String!
  }
  type BreakDownReturn {
    percentage: Float!
  }
  type SeasonalReturn {
    mostUsedPlan: Int!
    averageTripDuration: Float!
    topThreeStations: [Station!]!
  }
  input BreakDownInput {
    isOneWay: Boolean
    planDuration: Int!
  }
`
