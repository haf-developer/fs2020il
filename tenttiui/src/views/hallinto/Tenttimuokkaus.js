import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import {LisaaTentti, PoistaTentti} from './../../models/kanta'
import {Delete, AddCircle } from '@material-ui/icons';
import KysymysMuokkaus from './Kysymysmuokkaus'
import TekstiSyote from './Tekstisyote'
import { useState } from 'react';

function TenttiMuokkaus({tentit, paluufunktiot, dispatch}) {
  const [naytatentti, setNaytaTentti]=useState()
  const [tenttialustus, setTenttiAlustus]=useState(false)
  const [naytasyote, setNaytaSyote]=useState(false)
  const [naytalisays, setNaytaLisays]=useState(true)
  const [keskitytty, setKeskitytty]=useState()

  const hoidaNaytaSyote=()=>{
    setNaytaSyote(true)
    setNaytaLisays(false)
  }

  const naytaTenttiToiminto=(tenttiid)=>{
    let valittutentti=(naytatentti !== undefined )?
      ((naytatentti===tenttiid)?undefined:tenttiid)
      : tenttiid
    if( valittutentti===undefined){
      setKeskitytty(undefined)
    }
    setNaytaTentti(valittutentti)
  }

  const syotteenpaluu=(teksti)=>{
    console.log("TenttiMuokkaus syotteenpaluu teksti=", teksti)
    LisaaTentti(dispatch, teksti)
    setNaytaSyote(false)
    setNaytaLisays(true)
  }

  const nimenmuutospaluu=(teksti)=>{
    console.log("TenttiMuokkaus nimenmuutospaluu teksti=", teksti)

  }

  const hoidasulkeminentaikeskitys=( event, indeksi )=>{
    console.log("TenttiMuokkaus hoidasulkeminentaikeskitys event=", event)
    console.log("TenttiMuokkaus hoidasulkeminentaikeskitys indeksi=", indeksi)
    if( naytatentti !== undefined){
      let piilota=(keskitytty !==undefined)? true : false
      if( piilota){
        setNaytaTentti(undefined)
        setKeskitytty(undefined)
      }else{
        setKeskitytty(true)
      }
    }
  }

  console.log("tentit=", tentit)
  return(
    <div>
    <div className="TriplaRinnakkaiset">
      {tentit &&
      tentit.data.map((rivi, index)=>{
        const syotetainappula=(naytatentti !==undefined )? 
          (index===naytatentti)? true : false
          : false
        return(
          <div key={index+"tenttilista"}>
          { syotetainappula &&
            <TekstiSyote paluufunktio={nimenmuutospaluu} vinkki="Muuta tenttia" 
              alkuteksti={rivi.tentti} paluuPainallus={hoidasulkeminentaikeskitys} paluuid={index}></TekstiSyote>
          }
          { !syotetainappula &&
            <Button variant="outlined" color="primary" onClick={()=>naytaTenttiToiminto(index)}>
            {rivi.tentti}</Button>
          }
          <Delete onClick={()=>PoistaTentti( dispatch, rivi.id )}></Delete>
          </div>
        )}
      )
      }
    { naytasyote &&
      <TekstiSyote paluufunktio={syotteenpaluu} vinkki="tentin nimi tähän"></TekstiSyote>
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