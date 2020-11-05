import { Button } from '@material-ui/core';
import KysymysLista from './kysymyslista'
function TenttiLista({tentit, paluufunktio}) {

  return(
    <div>
      <h2>Tentit</h2>
      {tentit &&
      
      tentit.map((rivi, index)=>{
        return(
          <div key={index+"tenttilista"}>
          <Button color="primary">
            {rivi.tentti}</Button>
          <KysymysLista key={index+"t"}kysymykset={rivi.kysymykset}
                tenttiid={index} paluufunktio={paluufunktio}></KysymysLista>
          </div>
        )}
      )}
    </div>
  )
}

export default TenttiLista;