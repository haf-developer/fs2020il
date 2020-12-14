const jwt=require('jsonwebtoken')
const myLogger = function (req, res, next) {
  console.log('LOGGED path',req.path)
  let token=req.get('authorization')
  if(token){
    token=token.split(' ')[1]
    try{
      console.log("Varmennetaan token=", token)
      let verifyedtoken=jwt.verify(token,'shhhhh')
      if(verifyedtoken){
        next()
      }
      else{
        console.log("Tokeni on, mutta sen tarkistus epäonnistui token=", token)
        return res.status(401).json({ error: 'Ei kirjauduttu palveluun' })
      }
    }catch(error) {
      console.log('Logger Error=', error)
      return res.status(401).json({ error: 'Ei kirjauduttu palveluun' })
    }
  }else{
    console.log('Ollaanko kirjautumassa')
    if(req.path==="/api/kirjaudu"){
      console.log('KIrjautumaan vain')
      next()
    }else{
      return res.status(401).json({ error: 'Ei kirjauduttu palveluun' })
      // res.status(401).end()
    }
  }
}

module.exports = myLogger