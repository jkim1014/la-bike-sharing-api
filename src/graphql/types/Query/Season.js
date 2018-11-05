/* eslint-disable */
const Trip = require('../../../models/Trip')
const _ = require('lodash')

// We make the following assumptions about the four seasons
// Summer: between the months June - August
// Fall: between the months September - November
// Winter: between the months December - February
// Spring: between the months March - May

const seasonRange = {
  Summer: {
    start: 6,
    end: 8,
  },
  Fall: {
    start: 9,
    end: 11,
  },
  Winter: {
    start: 12,
    end: 2,
  },
  Spring: {
    start: 3,
    end: 5,
  },
}

const seasonResolver = async (obj, input) => {
  const counter = {
    '0': 0,
    '30': 0,
    '365': 0,
  }
  const season = seasonRange[input.season]
  let seasonal
  if (input.season === 'Winter') {
    seasonal = await Trip.query().whereRaw(
      'EXTRACT(MONTH FROM "startTime") = 12 OR EXTRACT(MONTH FROM "startTime") <= ?',
      season.end,
    )
  } else {
    seasonal = await Trip.query()
      .whereRaw('EXTRACT(MONTH FROM "startTime") >= ?', season.start)
      .whereRaw('EXTRACT(MONTH FROM "startTime") <= ?', season.end)
  }
  const durationsAndPlanCounter = seasonal.map(item => {
    if (item.plan !== null) {
      counter[item.plan.toString()] += 1
      return item.duration
    }
  })
  const avgDur =
    _.sum(durationsAndPlanCounter) / (60 * durationsAndPlanCounter.length)
  const popularPlan = parseInt(
    Object.keys(counter).reduce((a, b) => (counter[a] > counter[b] ? a : b)),
  )
  let topThreeSubQuery
  if (input.season === 'Winter') {
    topThreeSubQuery = await Trip.query()
      .select('startStationId')
      .count('startStationId as count')
      .whereRaw(
        'EXTRACT(MONTH FROM "startTime") = 12 OR EXTRACT(MONTH FROM "startTime") <= ?',
        season.end,
      )
      .groupBy('startStationId')
      .orderByRaw('count DESC')
      .limit(3)
  } else {
    topThreeSubQuery = await Trip.query()
      .select('startStationId')
      .count('startStationId as count')
      .whereRaw('EXTRACT(MONTH FROM "startTime") >= ?', season.start)
      .whereRaw('EXTRACT(MONTH FROM "startTime") <= ?', season.end)
      .groupBy('startStationId')
      .orderByRaw('count DESC')
      .limit(3)
  }
  const topThreeStartingStations = topThreeSubQuery.map(async station => {
    const start = await Trip.query()
      .where('startStationId', station.startStationId)
      .first()
    return {
      id: station.startStationId,
      latitude: start.startLatitude,
      longitude: start.startLongitude,
    }
  })
  return {
    mostUsedPlan: popularPlan,
    averageTripDuration: avgDur,
    topThreeStations: topThreeStartingStations,
  }
}

const resolver = {
  Query: {
    seasonal: seasonResolver,
  },
}

module.exports = resolver
