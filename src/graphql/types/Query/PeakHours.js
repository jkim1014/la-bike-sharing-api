/* eslint-disable */
const Trip = require('../../../models/Trip')

const peakHoursResolver = async obj => {
  const counter = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '17': 0,
    '18': 0,
    '19': 0,
    '20': 0,
    '21': 0,
    '22': 0,
    '23': 0,
  }
  const zero = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 0')
    .first()
  const one = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 1')
    .first()
  const two = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 2')
    .first()
  const three = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 3')
    .first()
  const four = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 4')
    .first()
  const five = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 5')
    .first()
  const six = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 6')
    .first()
  const seven = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 7')
    .first()
  const eight = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 8')
    .first()
  const nine = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 9')
    .first()
  const ten = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 10')
    .first()
  const eleven = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 11')
    .first()
  const twelve = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 12')
    .first()
  const thirteen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 13')
    .first()
  const fourteen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 14')
    .first()
  const fifteen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 15')
    .first()
  const sixteen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 16')
    .first()
  const seventeen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 17')
    .first()
  const eighteen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 18')
    .first()
  const nineteen = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 19')
    .first()
  const twenty = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 20')
    .first()
  const twentyone = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 21')
    .first()
  const twentytwo = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 22')
    .first()
  const twentythree = await Trip.query()
    .select()
    .count()
    .whereRaw('EXTRACT(HOUR FROM "startTime") = 23')
    .first()
  counter['0'] += zero.count
  counter['1'] += one.count
  counter['2'] += two.count
  counter['3'] += three.count
  counter['4'] += four.count
  counter['5'] += five.count
  counter['6'] += six.count
  counter['7'] += seven.count
  counter['8'] += eight.count
  counter['9'] += nine.count
  counter['10'] += ten.count
  counter['11'] += eleven.count
  counter['12'] += twelve.count
  counter['13'] += thirteen.count
  counter['14'] += fourteen.count
  counter['15'] += fifteen.count
  counter['16'] += sixteen.count
  counter['17'] += seventeen.count
  counter['18'] += eighteen.count
  counter['19'] += nineteen.count
  counter['20'] += twenty.count
  counter['21'] += twentyone.count
  counter['22'] += twentytwo.count
  counter['23'] += twentythree.count
  const toRet = Object.entries(counter).map(entry => {
    return {
      hour: parseInt(entry[0]),
      frequency: entry[1],
    }
  })
  return toRet
}

const resolver = {
  Query: {
    peakHours: peakHoursResolver,
  },
}

module.exports = resolver
