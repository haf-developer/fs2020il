import {Kirjautuminen} from './../models/kanta'

const Kirjaudu=(({dispatch})=>{

  console.log("Kirjaudu")
  return(
    <div>
      Kirjaudus nyt
      <button onClick={()=>Kirjautuminen(dispatch,{ email:"toivo@reputtajat.com" , salasana:"Toivo" })}>kirjaudu</button>
    </div>
  )
})

export default Kirjaudu;