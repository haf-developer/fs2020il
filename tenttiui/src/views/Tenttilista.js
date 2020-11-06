import { Button } from '@material-ui/core';
import KysymysLista from './kysymyslista'
import { useState } from 'react';

function TenttiLista({tentit, paluufunktio}) {
  const [naytatentti, setNaytaTentti]=useState()

  const naytaTenttiToiminto=(tenttiid)=>{
    const valittutentti=parseInt(tenttiid)
    setNaytaTentti(valittutentti)
  }



  return(
    <div>
      <h2>Tentit</h2>
      {tentit &&
      
      tentit.map((rivi, index)=>{
        const naytettavatentti=(naytatentti !== undefined)? index===naytatentti : false
        
        return(
          <div key={index+"tenttilista"}>
          <Button color="primary" onClick={()=>naytaTenttiToiminto(index)}>
            {rivi.tentti}</Button>
            {naytettavatentti &&
              <KysymysLista key={index+"t"}kysymykset={rivi.kysymykset}
              tenttiid={index} paluufunktio={paluufunktio}></KysymysLista>
            }
          </div>
        )}
      )}
    </div>
  )
}

export default TenttiLista;