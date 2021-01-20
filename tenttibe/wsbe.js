const logger = require('./utils/logger')
const express = require('express')
const wsbe = express()
wsbe.use(express.json())
const cors = require('cors')

/*
const ws=require('ws')
const wss=new ws.server({noserver: true, clietsTracking: true})
wss.handleUpgrade
ws.on('message', ()=>{

})

ws.send('hello from, $[name]')
ws.close(1000,"bye")
*/

const corsoptions={
  origin: 'http://localhost:3000'
}

logger.info('Ws backend käynnistetty')
wsbe.use(cors(corsoptions))

module.exports = wsbe
