const myLogger = function (req, res, next) {
  console.log('LOGGED path',req.path)
  next()
}

module.exports = myLogger