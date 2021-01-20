const app = require('./tenttibe')
const config = require('./utils/config')

const port = config.PORT

app.listen(port, () => {
  console.log(`Tentti BackEnd app listening at http://localhost:${port}`)
})

const wsapp = require('./wsbe')
const wsport = config.WSPORT
wsapp.listen(wsport, () => {
  console.log(`Tentti WS BackEnd app listening at http://localhost:${wsport}`)
})

