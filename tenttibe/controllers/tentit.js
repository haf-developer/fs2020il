const tentitRouter = require('express').Router()
const db = require('./../db/kyselyt')

tentitRouter.get('/henkilot', (req, res, next ) => {
  db.query('SELECT * FROM henkilot' , undefined /* [req.params.id] */,
      (err, result)=>{
        if(err){
          next(err)
        }
        const arvot=JSON.stringify(result.rows)
        console.log("kannasta palautui=", arvot)
        res.send('Hello World! ' + arvot )
       } )
       // .catch(error => next(error))
  })

tentitRouter.get('/tentit', (req, res, next ) => {
  db.query(`SELECT * FROM tentit` , undefined /* [req.params.id] */,
    (err, result)=>{
      if(err){
        next(err)
      }
      const arvot=JSON.stringify(result.rows)
      console.log("kannasta palautui=", result.rows)
      res.send( arvot )
      } )
})

tentitRouter.get('/kysymykset/:id/vaihtoehdot/', (req, res, next ) => {
  console.log("kannasta vaihtoehtoja req.params.id=", req.params.id)
  db.query(`SELECT vaihtoehdot.id,vaihtoehto,oikein FROM vaihtoehdot JOIN
    kysymykset ON vaihtoehdot.kysymysid=kysymykset.id
    WHERE kysymykset.id=$1`, [req.params.id],(err, result)=>{
    if(err){
      next(err)
    }
    res.json( result.rows )
    } )
  })


tentitRouter.post('/tentit/', (req, res, next ) => {
  console.log("Lisätään kantaan req.body.nimi=", req.body.nimi)
  db.query(`INSERT INTO tentit(nimi) VALUES ($1) RETURNING *`, [req.body.nimi],(err, result)=>{
    if(err){
      next(err)
    }
    res.json( result.rows )
    } )
  })

tentitRouter.delete('/tentit/:id', (req, res, next ) => {
  db.query(`DELETE id FROM tentit WHERE id=$1`, [req.params.id],(err, result)=>{
    if(err){
      res.status(404).end()
      // next(err)
    }
    res.json( result.rows )
  } )
})

tentitRouter.get('/tentit/:id/kysymykset/', (req, res, next ) => {
  console.log("kannasta kysymyksii req.params.id=", req.params.id)
  db.query(`SELECT id,kysymys FROM kysymykset INNER JOIN
    tenttikysymykset ON tenttikysymykset.kysymys_id=kysymykset.id
    WHERE tenttikysymykset.tentti_id=$1`, [req.params.id],(err, result)=>{
    if(err){
      next(err)
    }
    res.json( result.rows )
    } )
  })

tentitRouter.put('/tentit/:id/kysykset/:id/', (req, res, next ) => {
  db.query('SELECT * FROM tentit' , undefined /* [req.params.id] */,
  (err, result)=>{
    if(err){
      next(err)
    }
    const arvot=JSON.stringify(result.rows)
    console.log("kannasta palautui=", result.rows)
    res.send( arvot )
    } )
  })

module.exports = tentitRouter