import './App.css';
import { useState, useEffect } from 'react';
import PeruslistaUi from './views/Peruslistat';
import OliolistaUi from './views/Oliolistat';

function ListaUi() {
  const nakymat=[
    {nayta: "Perus", checked: true},
    {nayta: "Oliolista", checked: false}
  ]

  const [listat, setListat]=useState(nakymat)
  return (
    <div className="App" style={{ height: 400, width: '100%' }}>
      <h1>Listoja</h1>
      {listat[0].checked && <div>
        <PeruslistaUi />
        </div>
      }
      {listat[1].checked && <div>
        <OliolistaUi />
        </div>
      }
    </div>
  );
}

export default ListaUi;
