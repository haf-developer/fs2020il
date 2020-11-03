import { useEffect, useState } from 'react';
import './TenttiUI.css';
import TenttiLista from './views/Tenttilista'

function TenttiUI() {
  const alustusdata=[
    { etunimi: "Joku", sukunimi: "Tuntematon",
    tentit: [{
      tentti: "Testi",
      kysymykset: [
        {
        kysymys: "Onko oikeaa vastausta",
        valinnat: [
          { id: 1, teksti: "Ei"},
          { id: 2, teksti: "Melko varmasti"},
          { id: 3, teksti: "On" }
        ]
      }
      ]
    }]
  }]

  const [nimi, setNimi]= useState()

  useEffect(()=>{
    const storage=window.localStorage

    let alkudata=undefined
    // storage.setItem( 'nimidata', JSON.stringify(alkudata) )
    alkudata=storage.getItem('nimidata')
    if(!alkudata){
      storage.setItem( 'nimidata', JSON.stringify(alustusdata) )
      alkudata=JSON.stringify(alustusdata)
    }else if(alkudata==='undefined' || alkudata===null){
      storage.setItem( 'nimidata', JSON.stringify(alustusdata) )
      alkudata=JSON.stringify(alustusdata)
    }
    setNimi(JSON.parse(alkudata))
  },[])

  useEffect(()=>{
    window.localStorage.setItem( 'nimidata', JSON.stringify(nimi) )
  },[nimi])

/*
          rivi.tentit.map((tenttirivi, tenttiindex) => {
            return(
              <div key={tenttiindex+"tenttirivi"}>tentis {tenttirivi}
              </div>
            )
          })
*/

  return (
    <div className="App">
    <header className="Valikko">
    <title>Tebttisovellus</title>
    Valikko
    <button className="ValikkoNappi" type="button">Kirjaudu</button>
    </header>

    <h1>
    Tenttisovellus
    </h1>
    { nimi &&
    nimi.map((rivi, index) =>{
      return(
        <div key={index+"kokelasrivi"}>Suorittaja {rivi.etunimi} {rivi.sukunimi}
        { rivi.tentit &&
          <div>
          <TenttiLista tentit={rivi.tentit}></TenttiLista>
          </div>
        }
        </div>
        )
      })
    }
    </div>
  );
}

export default TenttiUI;
