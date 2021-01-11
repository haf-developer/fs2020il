const summa = (a,b) => {
  return a+b
}

//['a','e','y']    ['k','i','s','s','a']  
//['-','-','-','-','a']
const merkkaaLöydetytKirjaimet = (arvatutKirjaimet, sananKirjaimet) => {
  return sananKirjaimet.reduce((acc, sananKirjain) => (
      arvatutKirjaimet.includes(sananKirjain) ? acc.concat([sananKirjain]) : acc.concat(['_'])
  ), [])
}

module.exports = {
  summa: summa,
  merkkaaLöydetytKirjaimet: merkkaaLöydetytKirjaimet
}  