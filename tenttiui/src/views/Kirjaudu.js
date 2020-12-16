import {Kirjautuminen} from './../models/kanta'
import { useState } from 'react';

const Kirjaudu=(({dispatch})=>{
  const [kayttaja, setKayttaja] = useState(
    {
      sahkoposti: "",
      salasana: ""
    }
  )

  const hoidaSyotteet = (event)=>{
    setKayttaja({ ...kayttaja, [event.target.name]: event.target.value })
  }

  console.log("Kirjaudu")
  return(
    <div>
      Kirjaudus nyt
      <div key="id_div_sahkoposti">
        Sahkoposti<input key="sahkoposti_id" type="text" value={kayttaja.sahkoposti}
        name="sahkoposti" onChange={(event)=>hoidaSyotteet(event)}></input>
      </div>
      <div key="id_div_salasana">
        Salasana<input type="password" value={kayttaja.salasana}
        name="salasana" onChange={(event)=>hoidaSyotteet(event)}></input>
      </div>

      <button onClick={()=>Kirjautuminen(dispatch, kayttaja)}>kirjaudu</button>
    </div>
  )
})

export default Kirjaudu;