const henkilotRouter = require('express').Router()
const db = require('../db/kyselyt')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const SALT_ROUNDS=10

henkilotRouter.get('/henkilot', (req, res, next ) => {
  db.query('SELECT * FROM henkilot' , undefined /* [req.params.id] */,
    (err, result)=>{
      if(err){
        next(err)
      }
      res.status(200).json(result)
      return result
      })
      // .catch(error => next(error))
  })


henkilotRouter.post('/kirjaudu', (req, res, next ) => {
  console.log("kirjautuminen req.body=", req.body)
  db.query('SELECT salasana FROM henkilot WHERE sahkoposti=$1',
  [req.body.kayttaja.sahkoposti], (err, result)=>{
    if(err){
      next(err)
    }
    if(result.rows){
      console.log("Kirjautuminen rows.length=", result.rows.length)
      if(result.rows.length===1)
      {
        console.log("Kirjautuminen rows[0] ennen comparea=", result.rows[0])
        bcrypt.compare(req.body.kayttaja.salasana,
          result.rows[0].salasana, function(err, conmpareresult) {
          console.log( "bcrypt compare conmpareresult=", conmpareresult)
          if( conmpareresult){
            let tokeni=jwt.sign({sahkoposti: req.body.kayttaja.sahkoposti},'shhhhh')
            console.log("token=", tokeni)
            res.status(200).send(tokeni)
          }
        })
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
  const kelpaako=Object.values(req.body.kayttaja).every((rivi)=>{
    return(rivi.length>1)
  })
  if( !kelpaako){
    console.log("Heitetään virhe koska tiedot ei kelpaa")
    return res.status(403).json({
      error: 'Tiedot puutteelliset'
    })
  }

  db.query('SELECT * FROM henkilot', undefined, (err, result)=>{
    if(err){
      next(err)
    }
    let rooli='opiskelija'
    // console.log("rekistoroi henkilot result=", result)
    if(result.rows){

      if(result.rows.length==0){
        rooli='admin'
      }
      console.log("rekistoroi aseta rooli=", rooli)
      // TODO: salasanan pituuden tarkistus epäonnistumisen operaatiot
      if(req.body.kayttaja.salasana.length < 6){
        console.log("rekistoroi VIRHE salasana liian lyhyt salasan=", req.body.kayttaja.salasana)
        return res.status(403).json({
          error: 'Salasana ei kelpaa'
        })
        //throw new Error("Salasana alle 6 merkkiä")
      }
      console.log("Salasana kelpaa rekistorointi jatkuu")
      bcrypt.hash(req.body.kayttaja.salasana, SALT_ROUNDS, (hasherr, hash)=>{
        console.log("hash=",hash)
        const posti = req.body.kayttaja.sahkoposti? req.body.kayttaja.sahkoposti : "eipostii"
        console.log("posti=", posti)
        db.query(
          `
          INSERT INTO henkilot(sahkoposti, salasana, etunimi, sukunimi, rooli)
          VALUES ($1, $2, $3, $4, $5) RETURNING id
          `, [req.body.kayttaja.sahkoposti, hash, req.body.kayttaja.etunimi,
            req.body.kayttaja.sukunimi, rooli], (err2, result2)=>{
          if(err2){
            next(err2)
          }
          res.status(200).json(result2)
          return result2  
        })
      })
    }else{
      return res.status(401).json({
        error: 'Ei toimi vielä'
      })
    }
  })
})

module.exports = henkilotRouter