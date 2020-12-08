const { Pool, Client } = require('pg')
const config = require('./../utils/config')

const pool = new Pool({
  user: config.PGUSER,
  host: config.PGHOST,
  port: config.PGPORT,
  database: config.PGDB,
  password: config.PGPASSWORD
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
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
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
      }
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)
        // clear our timeout
        clearTimeout(timeout)
        // set the query method back to its old un-monkey-patched version
        client.query = query
      }
      callback(err, client, release)
    })
  },
  clientquery: (client, text, params) => {
    const start = Date.now()
    client
      .query(text, params)
      .then(result => {
        console.log(result)
        const duration = Date.now() - start
        console.log('executed query', { text, duration })
        })
      .catch(e => console.error(e.stack))
      .then(() => client.end())
    /*
    client
      .query('SELECT NOW()')
      .then(result => console.log(result))
      .catch(e => console.error(e.stack))
      .then(() => client.end())
      */
  }
}
