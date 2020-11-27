const express = require('express')
const app = express()
app.use(express.json())
const config = require('./utils/config')
const tenttiRouter = require('./controllers/tentit')

app.use('/api', tenttiRouter)

const port = config.PORT

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
