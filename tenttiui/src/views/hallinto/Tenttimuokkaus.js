import { Button } from '@material-ui/core';
import KysymysMuokkaus from './Kysymysmuokkaus'
import { useState } from 'react';

function TenttiMuokkaus({tentit, paluufunktiot, lisaysPaluufunktio}) {
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



  return(
    <div>
    <div className="TriplaRinnakkaiset">
      {tentit &&
      tentit.map((rivi, index)=>{
        return(
          <Button key={index+"tenttilista"} color="primary" onClick={()=>naytaTenttiToiminto(index)}>
            {rivi.tentti}</Button>
        )}
      )
      }
    <Button key="tenttilisaaja" variant="contained" color="primary"
    disabled={!tenttialustus} onClick={()=>lisaysPaluufunktio(uusitentti)}>
      Lisää tentti</Button>
    <input key="tenttinimi" type="text" value={uusitentti} onChange={event=>hoidaMuutos(event)}></input>
    </div>
    { (naytatentti !==undefined ) &&
      <KysymysMuokkaus key={naytatentti+"nt"} kysymykset={tentit[naytatentti].kysymykset}
      tenttiid={naytatentti} paluufunktiot={paluufunktiot}></KysymysMuokkaus>
    }
    </div>
  )
}

export default TenttiMuokkaus;