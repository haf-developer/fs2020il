import React, { useState } from 'react';

import risti from './risti.svg';
import nolla from './nolla.svg';

function App() {
  const [lauta, setLauta]=useState([
    [0,0,0],
    [0,0,0],
    [0,1,2]])
  const [pelaaja, setPelaaja]=useState()

  return (
    <div className="App">
      <h1>Ristinolla</h1>
      <img src={risti} className="Risti" alt="risti" />
      <img src={nolla} className="Nolla" alt="nolla" />
      <br/>
      Pelaaja {pelaaja}
      <br/>
      {lauta.map((rivi)=>{
        return(
        <div>
          {rivi.map((ruutu)=>{
          if(ruutu>1){
            return(
              <div>
              <img src={risti} className="Risti" alt="risti" />
              </div>
            )
          }else if(ruutu>0){
            return(
              <div>
              <img src={nolla} className="Nolla" alt="nolla" />
              </div>
            )
          }
          return(
            <div>Tyhja</div>
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
