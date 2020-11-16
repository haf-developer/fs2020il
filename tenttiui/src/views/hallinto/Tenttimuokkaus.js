import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import {Delete} from '@material-ui/icons';
import KysymysMuokkaus from './Kysymysmuokkaus'
import { useState } from 'react';

function TenttiMuokkaus({tentit, paluufunktiot, dispatch}) {
  const [naytatentti, setNaytaTentti]=useState()
  const [uusitentti, setUusiTentti]=useState("tentin nimi tähän")
  const [tenttialustus, setTenttiAlustus]=useState(false)

  const hoidaMuutos=(event)=>{
    if(!tenttialustus){
      setTenttiAlustus(true)
      setUusiTentti("")
    }else{
      setUusiTentti(event.target.value)
    }
  }

  const naytaTenttiToiminto=(tenttiid)=>{
    let valittutentti=(naytatentti !== undefined )?
      ((naytatentti===tenttiid)?undefined:tenttiid)
      : tenttiid
    
    setNaytaTentti(valittutentti)
  }


  console.log("tentit=", tentit)
  return(
    <div>
    <div className="TriplaRinnakkaiset">
      {tentit &&
      tentit.data.map((rivi, index)=>{
        return(
          <div key={index+"tenttilista"}>
          <Button color="primary" onClick={()=>naytaTenttiToiminto(index)}>
            {rivi.tentti}</Button>
          <Delete onClick={()=>dispatch({type: "TENTIN_POISTO", idtentti: rivi.id} )}></Delete>
          </div>
        )}
      )
      }
    <Button key="tenttilisaaja" variant="contained" color="primary"
    disabled={!tenttialustus} onClick={()=>dispatch({type: "TENTIN_LISAYS", tentinnimi: uusitentti} )} >
      Lisää tentti</Button>
    <input key="tenttinimi" type="text" value={uusitentti} onChange={event=>hoidaMuutos(event)}></input>
    </div>
    { (naytatentti !==undefined ) &&
    <Fade left>
      <KysymysMuokkaus key={naytatentti+"nt"} kysymykset={tentit.data[naytatentti].kysymykset}
      tenttiid={tentit.data[naytatentti].id} dispatch={dispatch} paluufunktiot={paluufunktiot}></KysymysMuokkaus>
      </Fade>
    }
    </div>
  )
}

export default TenttiMuokkaus;