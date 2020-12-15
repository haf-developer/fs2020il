const henkilotRouter = require('express').Router()
const db = require('../db/kyselyt')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const SALT_ROUNDS=10

bcrypt.hash("kissa", SALT_ROUNDS, (err, hash)=>{
  console.log("hash=",hash)
  // let token=jwt.sign({foo: 'bar'},'shhhhh')
  // console.log("token=", token)
})

henkilotRouter.get('/henkilot', (req, res, next ) => {
  db.query('SELECT * FROM henkilot' , undefined /* [req.params.id] */,
    (err, result)=>{
      if(err){
        next(err)
      }
      const arvot=JSON.stringify(result.rows)
      console.log("kannasta palautui=", arvot)
      res.send('Hello World! ' + arvot )
      })
      // .catch(error => next(error))
  })


henkilotRouter.post('/kirjaudu', (req, res, next ) => {
  console.log("kirjautuminen req.body=", req.body)
  db.query('SELECT sahkoposti FROM henkilot WHERE sahkoposti=$1 AND salasana=$2', [req.body.email,
    req.body.salasana], (err, result)=>{
    if(err){
      next(err)
    }
    if(result.rows){
      if(result.rows[0]===req.body.email)
      {
        let tokeni=jwt.sign({email: req.body.email},'shhhhh')
        console.log("token=", tokeni)        
        res.status(200).send(tokeni)
      }
    }else{
      return res.status(401).json({
        error: 'Väärä email tai salasana'
      })
    }
  })
})

henkilotRouter.post('/rekisteroi', (req, res, next ) => {
  console.log("rekisteroi req.body=", req.body)
  db.query('SELECT * FROM henkilot', undefined, (err, result)=>{
    if(err){
      next(err)
    }
    let rooli='opiskelija'
    console.log("rekistoroi henkilot result=", result)
    if(result.rows){

      if(result.rows.length==0){
        rooli='admin'
      }
    console.log("rekistoroi aseta rooli=", rooli)

    }
    return res.status(401).json({
      error: 'Ei toimi vielä'
    })
  })
})

module.exports = henkilotRouter