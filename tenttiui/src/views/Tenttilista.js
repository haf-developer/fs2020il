import { Button } from '@material-ui/core';
import KysymysLista from './kysymyslista'
import { useState } from 'react';

function TenttiLista({tentit, paluufunktio}) {
  const [naytatentti, setNaytaTentti]=useState()

  const naytaTenttiToiminto=(tenttiid)=>{
    let valittutentti=(naytatentti !== undefined )?
      ((naytatentti===tenttiid)?undefined:tenttiid)
      : tenttiid
    
    setNaytaTentti(valittutentti)
  }



  return(
    <div className="TriplaRinnakkaiset">
      {tentit &&
      tentit.map((rivi, index)=>{
        return(
          <Button key={index+"tenttilista"} color="primary" onClick={()=>naytaTenttiToiminto(index)}>
            {rivi.tentti}</Button>
        )}
      )
      }
      <div>
        { (naytatentti !==undefined ) &&
          <KysymysLista key={naytatentti+"nt"} kysymykset={tentit[naytatentti].kysymykset}
          tenttiid={naytatentti} paluufunktio={paluufunktio}></KysymysLista>
        }
      </div>
    </div>
  )
}

export default TenttiLista;