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
  client.query('LISTEN tentin_lisays').then(queryresult => {
    // release(err)
    const tulos=client.on('notification', msg => {
      console.log("tentin_lisays msg channel=",msg.channel)
      console.log("tentin_lisays msg payload=",msg.payload)
    })
  
    console.log("LISTEN on tentin_lisays tulos=", tulos)
    // return queryresult
  })
  .catch(e => {
    console.error(e.stack)
    console.log( "LISTEN tentin_lisays Virhe e=", e)
    // next(e)
    })
    /*
    .then(() =>{
      console.log("LISTEN client.end()")
      // client.end()
    })
    */
  client.query('LISTEN muutetut_tentit').then(queryresult => {
    // release(err)
    const tulos=client.on('notification', msg => {
      console.log("muutetut_tentit msg channel=",msg.channel)
      console.log("muutetut_tentit msg payload=",msg.payload)
    })
  
    console.log("LISTEN on muutetut_tentit tulos=", tulos)
    // return queryresult
  })
  .catch(e => {
    console.error(e.stack)
    console.log( "LISTEN muutetut_tentit Virhe e=", e)
    // next(e)
    })

  })

module.exports = tenttibe