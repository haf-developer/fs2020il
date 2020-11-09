import { useEffect, useState } from 'react';
import alustusdata from './testi/testidata'
import { AppBar, Button, Toolbar } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import './TenttiUI.css';
import TenttiLista from './views/Tenttilista'
import TenttiMuokkaus from './views/hallinto/Tenttimuokkaus'

function TenttiUI() {

  const [nimi, setNimi]=useState()
  const [dataAlustettu, setDataAlustettu]=useState(false)
  const [hallinnointiTila, setHallinnointi]=useState(true)

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

  const lisaaTentti=(tentinnimi)=>{
    let uusidata=nimi.concat()
    console.log("uusidata=", uusidata)
    // uusidata[0].tentit.push({tentti: tentinnimi})
    let uusitentti={tentti: tentinnimi}
    uusidata[0].tentit.push(uusitentti)
    setNimi(uusidata)
  }

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
    <title>Tenttisovellus</title>
    <AppBar position="static">
      <Toolbar>
        <Button variant="containedPrimary" color="inherit">Kirjaudu</Button>
        <Button variant="containedPrimary" color="inherit">Rekisteröidy</Button>
        <Button variant="containedPrimary" color="inherit">Tietoa sovelluksesta</Button>
      </Toolbar>
    </AppBar>

    { !hallinnointiTila && 
    <div>
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
    }
    { hallinnointiTila && 
      <div>
      { nimi &&
      nimi.map((rivi, index) =>{
        return(
          <div key={index+"hallinnoija"}>Hallinnoija {rivi.etunimi} {rivi.sukunimi}
          { rivi.tentit &&
            <div>
            <TenttiMuokkaus tentit={rivi.tentit} paluufunktio={valintaToiminto}
            lisaysPaluufunktio={lisaaTentti}></TenttiMuokkaus>
            </div>
          }
          </div>
          )
        })
      }
      </div>
    }
    </div>
  );
}

export default TenttiUI;
