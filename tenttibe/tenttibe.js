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

module.exports = tenttibe