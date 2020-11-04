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
          { id: 1, valittu: false, teksti: "Ei"},
          { id: 2, valittu: false, teksti: "Melko varmasti"},
          { id: 3, valittu: false, teksti: "On" }
        ]
      }
      ]
    }]
  }]

  const [nimi, setNimi]=useState()
  const [dataAlustettu, setDataAlustettu]=useState(false)

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
    alkudata=JSON.parse(alkudata)
    setNimi(alkudata)
    setDataAlustettu(true)    
  },[])

  useEffect(()=>{
    if(dataAlustettu){
      window.localStorage.setItem( 'nimidata', JSON.stringify(nimi) )
    }
  },[nimi])

  const valintaToiminto=(event, idtentti, idkysymys, idvalinta)=>{
    console.log("valintaToiminto idvalinta=", idvalinta)
    console.log("valintaToiminto event.target.checked=", event.target.checked)
    let uusidata=nimi.concat()
    console.log("uusidata=", uusidata)
    uusidata[0].tentit[idtentti].kysymykset[idkysymys].valinnat[idvalinta].valittu=event.target.checked
    setNimi(uusidata)
  }

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
          <TenttiLista tentit={rivi.tentit} paluufunktio={valintaToiminto}></TenttiLista>
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
