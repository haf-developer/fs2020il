const logger = require('./utils/logger')
const express = require('express')
const tenttibe = express()
tenttibe.use(express.json())
const cors = require('cors')

const corsoptions={
  origin: 'http://localhost:3000'
}

logger.info('Backend käynnistetty')
tenttibe.use(cors(corsoptions))

const paasynhallinta = require('./utils/paasynhallinta')
tenttibe.use(paasynhallinta)
const tenttiRouter = require('./controllers/tentit')
const henkilotRouter = require('./utils/henkilot')

tenttibe.use('/api', tenttiRouter)
tenttibe.use('/api', henkilotRouter)

const db = require('./db/kyselyt')
// const client=db.getClient()
db.getListeningClient( (err, client, release)=>{
  console.log("Starting LISTEN query ")

  client.query('LISTEN tentin_lisays').then(queryresult => {
    // release(err)
    console.log("LISTEN query err=", err)
    console.log("LISTEN queryresult=", queryresult)
    const tulos=client.on('notification', msg => {
      console.log("msg channel=",msg.channel) // foo
      console.log("msg.payload=",msg.payload) // bar!
    })
  
    console.log("LISTEN on tulos=", tulos)
    // return queryresult
  })
  .catch(e => {
    console.error(e.stack)
    console.log( "LISTEN Virhe e=", e)
    // next(e)
    })
    /*
    .then(() =>{
      console.log("LISTEN client.end()")
      // client.end()
    })
    */
  })

module.exports = tenttibe