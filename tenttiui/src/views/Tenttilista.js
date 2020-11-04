import KysymysLista from './kysymyslista'
function TenttiLista({tentit, paluufunktio}) {

  return(
    <div>
      <h2>Tentit</h2>
      {tentit &&
      tentit.map((rivi, index)=>{
        return(
          <div key={index+"tenttilista"}>
          Tentin nimi {rivi.tentti}
          {
            rivi.kysymykset &&
            <div>
            <KysymysLista kysymykset={rivi.kysymykset}
            tenttiid={index} paluufunktio={paluufunktio}></KysymysLista>
            </div>
          }
          </div>
        )
      })
      }
    </div>
  )
}

export default TenttiLista;