import React, { useState } from 'react';
import './App.css';
import risti from './risti.svg';
import nolla from './nolla.svg';
import ruutukuva from './ruutu.svg';

function App() {
  const [lauta, setLauta]=useState([
    [0,0,0],
    [0,0,0],
    [0,1,2]])
  const [pelaaja, setPelaaja]=useState()

  const valittuPelaaja=(event)=>{    
    const merkki=parseInt(event.target.value, 10)
    if(merkki){
      setPelaaja(merkki)
    }
  }


  return (
    <div className="App">
      <h1>Ristinolla</h1>
      Valitse rasti tai nolla. Risti aloittaa
      <button img={risti} className="Risti" alt="risti"
      value="1" onClick={(event)=>valittuPelaaja(event)}>Risti</button>
      <button img={nolla} className="Nolla" alt="nolla"
      value="2" onClick={(event)=>valittuPelaaja(event)}>Nolla</button>
      <br/>
      Pelaaja {pelaaja}
      <br/>
      {lauta.map((rivi, y)=>{
        return(
        <div>
          {rivi.map((ruutu, x)=>{
          if(ruutu>1){
            return(
              <img key={y+"siirto"+x} src={risti} className="Risti" alt="risti" />
            )
          }else if(ruutu>0){
            return(
              <img key={y+"siirto"+x} src={nolla} className="Nolla" alt="nolla" />
            )
          }
          return(
            <img key={y+"siirto"+x} src={ruutukuva} className="Ruutu" alt="ruutu" />
          )
          }
        )}
        <br/></div>
        )
      })
    }
    </div>
  );
}

export default App;
