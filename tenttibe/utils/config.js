require('dotenv').config()

let PORT = process.env.PORT || 3001
let WSPORT = process.env.WSPORT || 3002
let QMTTPORT = process.env.QMTTPORT || 3004
let PGPORT = process.env.PGPORT
let PGPASSWORD = process.env.PGPASSWORD
let PGUSER = process.env.PGUSER
let PGDB = process.env.PGDB
let PGHOST = process.env.PGHOST
/*
let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
*/

module.exports = {
  PGPORT,
  PGPASSWORD,
  PGUSER,
  PGDB,
  PGHOST,
  PORT,
  WSPORT,
  QMTTPORT
}