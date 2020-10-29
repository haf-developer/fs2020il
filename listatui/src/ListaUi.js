import './App.css';
import { useState, useEffect } from 'react';
import PeruslistaUi from './views/Peruslistat';
import OliolistaUi from './views/Oliolistat';

function ListaUi() {
  const nakymat=[
    {id: 0, otsake: "peruslista", nayta: <PeruslistaUi />, checked: true},
    {id: 1, otsake: "oliolista", nayta: <OliolistaUi />, checked: false}
  ]

  const [listat, setListat]=useState(nakymat)

  const valintaMuutos=(event)=>{
    const uudetlistat=listat.slice()
    const id=event.target.id
    uudetlistat[id].checked=event.target.checked
    setListat(uudetlistat)
  }
//     <div className="App" style={{ height: 400, width: '100%' }}>

  return (
    <div className="App">
      <h1>Listoja</h1>
      {listat.map( rivi=>{
        return(
          <div className="menulista">
          <input className="alkumenu" type="checkbox" id={rivi.id} checked={rivi.checked}
          onChange={(event)=>valintaMuutos(event)} />
          {!rivi.checked && <div>
            {rivi.otsake}
            </div>
          }
          {rivi.checked && <div>
            {rivi.nayta}
            </div>
          }
          </div>
        )}
      )}

      {listat[1].checked && <div>
        
        </div>
      }
    </div>
  );
}

export default ListaUi;
