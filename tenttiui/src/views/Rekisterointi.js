import { useState } from 'react';
import {Rekisteroityminen} from './../models/kanta'

const Rekisterointi=(({dispatch})=>{
  const [kayttaja, setKayttaja] = useState(
    {
      sahkoposti: "",
      salasana: "",
      etunimi: "",
      sukunimi: ""
    }
  )

  const hoidaRekisterointi = (event) => {
    event.preventDefault()
    console.log('hoidaRekisterointi button clicked', event.target)
    Rekisteroityminen(dispatch, kayttaja)
  }
 
  const hoidaSyotteet = (event)=>{
    setKayttaja({ ...kayttaja, [event.target.name]: event.target.value })
  }

  const avaimet=Object.keys(kayttaja)
  console.log("Rekisterointi")
  return(
    <form onSubmit={hoidaRekisterointi}>
    <div>
      {
      avaimet.map( rivi =>{
        const syote= rivi==="salasana"? "password" : "text"
        return(
          <div key={rivi +"id_div"}>
          {rivi}<input key={rivi+"_id"} type={syote} value={kayttaja[rivi]}
          name={rivi} onChange={(event)=>hoidaSyotteet(event)}></input>
          </div>
        )
        })
      }
      <button type="submit">
        Rekisteroityminen</button>
    </div>
    </form>
  )
})

export default Rekisterointi;