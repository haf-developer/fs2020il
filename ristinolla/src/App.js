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

  // const kohtaLaudalla=(x,y)=>{
  const kohtaLaudalla=(event)=>{
    // return function(x,y){
      // const [x,y]=JSON.parse(event.target.value)
      const [xs, , ys]=event.target.value
      const x=parseInt(xs, 10)
      const y=parseInt(ys, 10)

      if(pelaaja && undefined!==x && undefined!==y){
        if(lauta[y][x]===0){
          // Viite uuden sijasta
          // const uusilauta=lauta
          const uusilauta=lauta.slice(0)
          uusilauta[y][x]=pelaaja
          setLauta(uusilauta)
        }
      }
    // }
  }

  return (
    <div className="App" key="ristinolla">
      <h1>Ristinolla</h1>
      Valitse rasti tai nolla. Risti aloittaa
      <input type="image" key="ristivalinta" src={risti} className="Risti" alt="risti"
      value="1" onClick={(event)=>valittuPelaaja(event)} />
      <input type="image" key="nollavalinta" src={nolla} className="Nolla" alt="nolla"
      value="2" onClick={(event)=>valittuPelaaja(event)}/>
      <br/>
      Pelaaja {pelaaja}
      <br/>
      {lauta.map((rivi, y)=>{
        return(
        <div key={"rivi_"+y}>
          {rivi.map((ruutu, x)=>{
          if(ruutu>1){
            return(
              <img key={y+"siirto"+x} src={nolla} className="Nolla" alt="nolla"
               />
            )
          }else if(ruutu>0){
            return(
              <img key={y+"siirto"+x} src={risti} className="Risti" alt="risti" />
            )
          }
          return(
            <input type="image" key={y+"siirtokuva"+x} src={ruutukuva} className="Ruutu"
              alt="ruutu" value={[x,y]} onClick={(event)=>kohtaLaudalla(event)} />
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
