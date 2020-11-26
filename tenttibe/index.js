const config = require('./utils/config')
const express = require('express')
const app = express()
const db = require('./db/kyselyt')

app.get('/', (req, res, next ) => {
db.query('SELECT * FROM henkilot' , undefined /* [req.params.id] */,
    (err, result)=>{
      if(err){
        next(err)
      }
      const arvot=JSON.stringify(result)
      console.log("kannasta palautui=", arvot)
      res.send('Hello World! ' + arvot )
     } )
})

const port = config.PORT

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
