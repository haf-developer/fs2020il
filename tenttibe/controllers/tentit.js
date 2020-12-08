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
  db.getClient( (err, client, release)=>{
    console.log("temttirouter get /tentit alku")
    client.query('SELECT * FROM tentit')
    .then(queryresult => {
      release(err)
      res.json(queryresult.rows)
      console.log("temttirouter get /tentit release(err) err=", err)
      return queryresult
    })
    .catch(e => {
      console.error(e.stack)
      console.log( "Virhe temttirouter get /tentit kutsutaan next() e=", e)
      next(e)
      })
      .then(() =>{
        console.log("temttirouter get /tentit client.end()")
        // client.end()
      })
  })

})

tentitRouter.get('/kysymykset/:id/vaihtoehdot/', (req, res, next ) => {
  console.log("kannasta vaihtoehtoja req.params.id=", req.params.id)
  db.getClient( (err, client, release)=>{
    client.query(`SELECT vaihtoehdot.id,vaihtoehto,oikein FROM vaihtoehdot JOIN
      kysymykset ON vaihtoehdot.kysymysid=kysymykset.id
      WHERE kysymykset.id=$1`, [req.params.id],(err, result)=>{
      release(err)
      if(err){
        next(err)
      }
      res.json( result.rows )
      } )
    })    
  })

tentitRouter.post('/tentit/', (req, res, next ) => {
  console.log("tentitRouter.post /tentit/ Lisätään kantaan req.body.nimi=", req.body.nimi)
  db.getClient( (err, client, release)=>{
    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          // release the client back to the pool
          release()
        })
      }
      return !!err
    }

    client.query('BEGIN', err => {
      if (shouldAbort(err)){
        return
      }
      client.query(`INSERT INTO tentit(nimi) VALUES ($1) RETURNING *`, [req.body.nimi],(err, result)=>{
        if (shouldAbort(err)){
          return
        }
        client.query('COMMIT', err => {
          if (err) {
            console.error('Error committing transaction', err.stack)
          }
          release()
        })        
        if(err){
          next(err)
        }
        res.json( result.rows )
      })
    })
  })
})

tentitRouter.delete('/tentit/:id', (req, res, next ) => {
  console.log("kannasta pois tentti req.params.id=", req.params.id)
  db.query(`DELETE FROM tentit WHERE id=$1`, [req.params.id],(err, result)=>{
    if(err){
      res.status(404).end()
      // next(err)
    }
    res.json( result.rows )
  } )
})

tentitRouter.post('/tentit/:id/kysymykset/', (req, res, next ) => {
  console.log("Lisätään kysymys tentille req.params.id=", req.params.id)
  console.log("Lisätään req.body.kysymys=", req.body.kysymys)
  db.getClient( (err, client, release)=>{
    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          // release the client back to the pool
          release()
        })
      }
      return !!err
    }

    client.query('BEGIN', err => {
      if (shouldAbort(err)){
        return
      }
      client.query(`INSERT INTO kysymykset(kysymys) VALUES ($1) RETURNING *`, [req.body.kysymys],(err, result)=>{
        if (shouldAbort(err)){
          return
        }
        /*
        if(err){
          next(err)
        }
        */
        console.log("Lisätään kysymys edelleen tentille req.params.id=", req.params.id)
        console.log("Lisätään kysymys edelleen tentille result.rows=", result.rows)

        client.query(`INSERT INTO tenttikysymykset(kysymys_id,tentti_id) VALUES ($1,$2) RETURNING *`, 
        [result.rows[0].id, req.params.id],(err, result2)=>{
          if (shouldAbort(err)){
            return
          }

          if(err){
            next(err)
          }
          client.query('COMMIT', err => {
            if (err) {
              console.error('Error committing transaction', err.stack)
            }
            release()
            if(err){
              next(err)
            }  
            res.json( result.rows )
          })        
        })
      })
    })
  })
})

tentitRouter.post('/kysymykset/:kysymysid/vaihtoehdot/', (req, res, next ) => {
  console.log("Lisätään vaihtoehto kysymykselle req.params.kysymysid=", req.params.kysymysid)
  console.log("Lisätään req.body.vaihtoehto=", req.body.vaihtoehto)
  db.query(`INSERT INTO vaihtoehdot(vaihtoehto, oikein, kysymysid) VALUES ($1,$2,$3) RETURNING *`,
    [req.body.vaihtoehto.vaihtoehto, req.body.vaihtoehto.oikein, req.params.kysymysid],(err, result)=>{
    if(err){
      next(err)
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