const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    trip(id: ID!): Trip
    station(id: ID!): Station
    topTenStartStations: [StationWithCount!]!
    topTenStopStations: [StationWithCount!]!
    averageTripDuration(planDuration: Int): Float!
    averageDistanceTravelled(tripType: String): Float!
    regular: Float!
    breakDown(input: BreakDownInput!): BreakDownReturn!
    seasonal(season: String!): SeasonalReturn!
    topTenRoutes: [Route!]!
    peakHours: [Hour!]!
    weekend: Weekend!
    bike: [StationInfo!]!
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
  type Weekend {
    avgWeekend: Float!
    avgWeekday: Float!
  }
  type StationWithCount {
    id: ID!
    latitude: Float!
    longitude: Float!
    count: Int!
  }
  type Station {
    id: ID!
    latitude: Float!
    longitude: Float!
  }
  type StationInfo {
    station: String!
    deficit: Int!
  }
  type Route {
    startStationId: ID!
    endStationId: ID!
    frequency: Int!
  }
  type Hour {
    hour: Int!
    frequency: Int!
  }
  type Bike {
    id: ID!
  }
  type ParseDataReturn {
    success: Boolean!
    error: String
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
    tripType: String
    planDuration: Int!
  }
`
