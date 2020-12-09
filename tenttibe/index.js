const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')

const corsoptions={
  origin: 'http://localhost:3000'
}

app.use(cors(corsoptions))

const paasynhallinta = require('./utils/paasynhallinta')
app.use(paasynhallinta)
const config = require('./utils/config')
const tenttiRouter = require('./controllers/tentit')

app.use('/api', tenttiRouter)

const port = config.PORT

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
