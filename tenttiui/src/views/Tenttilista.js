import KysymysLista from './kysymyslista'
function TenttiLista(tentit) {

  return(
    <div>
      <h2>Tentit</h2>
      {tentit &&
      tentit.tentit.map((rivi, index)=>{
        return(
          <div key={index+"tenttilista"}>
          Tentin nimi {rivi.tentti}
          {
            rivi.kysymykset &&
            <div>
            <KysymysLista kysymykset={rivi.kysymykset}></KysymysLista>
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