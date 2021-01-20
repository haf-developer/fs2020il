const logger = require('./utils/logger')
const palastelija=require('mqtt'); // aedes or mosquito
// https://github.com/moscajs/aedes
// const express = require('express')
// const palastelija = express()
// palastelija.use(express.json())
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


// rc = send__connack(context, connect_ack, CONNACK_ACCEPTED, connack_props);

const corsoptions={
  origin: 'http://localhost:3000'
}

logger.info('Palastelija käynnistetty')
palastelija.use(cors(corsoptions))


module.exports = palastelija
