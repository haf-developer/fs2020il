const jwt=require('jsonwebtoken')
const myLogger = function (req, res, next) {
  console.log('LOGGED path',req.path)
  let token=req.header.token
  if(token){
    try{
      let verifyedtoken=jwt.verify(token,'shhhhh')
      if(verifyedtoken){
        next()
      }
    }catch(error) {
      console.log('Logger Error=', error)
    }
  }else{
    console.log('Ollaanko kirjautumassa')
    if(req.path==="/api/kirjaudu"){
      console.log('KIrjautumaan vain')
      next()
    }else{
      res.status(401).end()
    }
  }
}

module.exports = myLogger