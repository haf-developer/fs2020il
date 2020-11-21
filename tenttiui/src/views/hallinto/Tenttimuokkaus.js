import { Button, TextField } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import {LisaaTentti, PoistaTentti} from './../../models/kanta'
import {Delete, AddCircle } from '@material-ui/icons';
import KysymysMuokkaus from './Kysymysmuokkaus'
import { useState } from 'react';

function TenttiMuokkaus({tentit, paluufunktiot, dispatch}) {
  const [naytatentti, setNaytaTentti]=useState()
  const [uusitentti, setUusiTentti]=useState("")
  const [tenttialustus, setTenttiAlustus]=useState(false)
  const [naytasyote, setNaytaSyote]=useState(false)
  const [naytalisays, setNaytaLisays]=useState(true)

  const hoidaSyoteMuutos=(event)=>{
    /*
    if(!tenttialustus){
      if(uusitentti.length>2 ){
        setTenttiAlustus(true)
      }
    }
    */
    setUusiTentti(event.target.value)
  }

  const hoidaNaytaSyote=()=>{
    setNaytaSyote(true)
    setNaytaLisays(false)
  }

  const naytaTenttiToiminto=(tenttiid)=>{
    let valittutentti=(naytatentti !== undefined )?
      ((naytatentti===tenttiid)?undefined:tenttiid)
      : tenttiid
    
    setNaytaTentti(valittutentti)
  }

  const hoidaSyoteBlur=()=>{
    console.log("hoidaSyoteBlur event=")
    if(uusitentti.length>2 ){
      LisaaTentti(dispatch, uusitentti)
      setNaytaSyote(false)
      setNaytaLisays(true)
      setUusiTentti("")
    }
  }

  const hoidaSyoteNappain=(event)=>{
    console.log("hoidaSyoteNappain event=", event)

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
          <Delete onClick={()=>PoistaTentti( dispatch, rivi.id )}></Delete>
          </div>
        )}
      )
      }
    { naytasyote &&
      <TextField key="tenttinimi" id="outlined-basic" variant="outlined" label="tentin nimi tähän"
        value={uusitentti} onChange={event=>hoidaSyoteMuutos(event)}
        onBlur={()=>hoidaSyoteBlur()}></TextField>  
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