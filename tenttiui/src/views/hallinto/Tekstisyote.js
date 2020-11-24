import { TextField } from '@material-ui/core';
import { useState } from 'react';

function TekstiSyote({paluufunktio, paluuPainallus=undefined, paluuid=undefined, vinkki="", alkuteksti="", minimiraja=2}){
  const [teksti, setTeksti]=useState(alkuteksti)

  const hoidaPainallus=(event)=>{
    if( paluuPainallus ){
      paluuPainallus(event, paluuid)
    }
  }

  const hoidaSyoteMuutos=(event)=>{
    setTeksti(event.target.value)
  }

  const hoidaSyoteBlur=()=>{
    console.log("hoidaSyoteBlur event=")
    if(teksti.length > minimiraja ){
      if(alkuteksti !== teksti){
        paluufunktio(teksti)
      }
    }
  }

  const hoidaSyoteNappain=(event)=>{
    if( event.key === "Enter")
    {
      hoidaSyoteBlur()
    }
  }

  return(
    <TextField key="syotenimi" id="syote_outlined_basic" variant="outlined" label={vinkki}
    value={teksti} onChange={event=>hoidaSyoteMuutos(event)}
    onBlur={()=>hoidaSyoteBlur()} onKeyUp={(event)=>hoidaSyoteNappain(event)}
    onClick={(event)=>hoidaPainallus(event)}></TextField>
  )
}

export default TekstiSyote