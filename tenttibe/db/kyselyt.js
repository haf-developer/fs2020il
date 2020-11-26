const { Pool, Client } = require('pg')
const config = require('./../utils/config')

const pool = new Pool({
  user: config.PGUSER,
  host: config.PGHOST,
  port: config.PGPORT,
  database: config.PGDB,
  password: config.PGPASSWORD
})

/*
const client = new Client()
await client.connect()
const res = await client.query('SELECT NOW()')
await client.end()
*/

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text, duration })
      callback(err, res)
    })
  },
}
