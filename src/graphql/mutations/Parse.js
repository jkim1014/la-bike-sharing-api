/* eslint-disable */
const csv = require('csv-parser')
const fs = require('fs')
const haversine = require('haversine')

// If this tripID is not in the db 1912818
function parseCSV() {
  fs.createReadStream('data/listings.csv')
    .pipe(csv())
    .on('data', data => {
      console.log(data)
    })
    .on('end', () => {
      console.log('Finished loading locations data')
    })
}
