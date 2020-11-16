import { Button, TextField } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import {Delete, AddCircle} from '@material-ui/icons';
import KysymysMuokkaus from './Kysymysmuokkaus'
import { useState } from 'react';

function TenttiMuokkaus({tentit, paluufunktiot, dispatch}) {
  const [naytatentti, setNaytaTentti]=useState()
  const [uusitentti, setUusiTentti]=useState("tentin nimi tähän")
  const [tenttialustus, setTenttiAlustus]=useState(false)
  const [naytasyote, setNaytaSyote]=useState(false)
  const [naytalisays, setNaytaLisays]=useState(true)

  const hoidaMuutos=(event)=>{
    if(!tenttialustus){
      if(uusitentti.length>2 ){
        dispatch({type: "TENTIN_LISAYS", tentinnimi: uusitentti} )
        setTenttiAlustus(true)
      }
    }
    // dispatch({type: "TENTIN_NIMEN_MUUTOS", tentinnimi: uusitentti, idtentti: id} )

    setUusiTentti(event.target.value)
  }

  const hoidaNaytaSyote=()=>{
    setNaytaSyote(true)
    setNaytaLisays(false)
    setUusiTentti("")
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
    { naytasyote &&
      <TextField key="tenttinimi" id="outlined-basic" variant="outlined"
        value={uusitentti} onChange={event=>hoidaMuutos(event)}></TextField>  
    }
    { naytalisays &&
      <AddCircle key="tenttilisaaja" variant="contained" color="primary"
      onClick={()=>hoidaNaytaSyote()} >Lisää tentti</AddCircle>  
    }
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