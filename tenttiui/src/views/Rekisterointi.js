
import {Rekisteroityminen} from './../models/kanta'

const Rekisterointi=(({dispatch})=>{

  console.log("Rekisterointi")
  return(
    <div>
      <input type="text">

      </input>
      <button onClick={()=>Rekisteroityminen(dispatch,{ email:"toivo@reputtajat.com" , salasana:"Toivo" })}>kirjaudu</button>
    </div>
  )
})

export default Rekisterointi;