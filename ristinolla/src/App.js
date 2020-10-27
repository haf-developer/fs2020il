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
  const [voittaja, setVoittaja]=useState()

  const valittuPelaaja=(event)=>{    
    const merkki=parseInt(event.target.value, 10)
    if(merkki){
      setPelaaja(merkki)
    }
  }

  const luovutaPeli=()=>{
    pelaaja===1 ? setVoittaja(2) : setVoittaja(1)
  }

  const uusiPeli=()=>{
    setLauta(
      [[0,0,0],
      [0,0,0],
      [0,0,0]]
    )
    setVoittaja(undefined)
    setPelaaja(undefined)
  }

  const nollaaRuutu=(x,y)=>{
    // console.log("x ja y",x ,y)
    const uusilauta=lauta.slice(0)
    uusilauta[y][x]=0
    setLauta(uusilauta)
  }

  const kohtaLaudalla=(event)=>{
    // const [x,y]=JSON.parse(event.target.value)
    const [xs,, ys]=event.target.value
    const x=parseInt(xs, 10)
    const y=parseInt(ys, 10)

    if(undefined===voittaja && pelaaja && undefined!==x && undefined!==y){
      if(lauta[y][x]===0){
        // Viite uuden sijasta
        // const uusilauta=lauta
        const uusilauta=lauta.slice(0)
        uusilauta[y][x]=pelaaja
        if(tulikoVoitto(x,y,pelaaja,uusilauta)){
          setVoittaja(pelaaja)
        }else{
          pelaaja===1 ? setPelaaja(2) : setPelaaja(1)
        }
        setLauta(uusilauta)
      }
    }
  }

  const tulikoVoitto=((x, y, nappula, pelilauta)=>{
    let voitto=pelilauta.every( (yruutu)=>yruutu[x]===nappula)
    voitto=voitto ? voitto :pelilauta[y].every( (xruutu)=>xruutu===nappula)
    /*
    const suoranpituus=pelilauta.length-1
    const yalku=suoranpituus-y
    const xalku=suoranpituus-x

    voitto=xsuunta.reduce((summa, arvo)=>{
      if(arvo===nappula){
        summa++
      }else{
        break;
      }
      return summa
    },0)
    */
    return voitto
  })

  return (
    <div className="App" key="ristinolla">
      <h1>Ristinolla</h1>
      { 
      undefined===pelaaja && <div key="pelaajanvalinta">
        Valitse rasti tai nolla. Risti aloittaa
        <input type="image" key="ristivalinta" src={risti} className="Risti" alt="risti"
        value="1" onClick={(event)=>valittuPelaaja(event)} />
        <input type="image" key="nollavalinta" src={nolla} className="Nolla" alt="nolla"
        value="2" onClick={(event)=>valittuPelaaja(event)}/>
        </div>
      }
      {
        pelaaja>0 && <div key="pelilauta">
        Pelaaja {pelaaja}
        {lauta.map((rivi, y)=>{
          return(
          <div key={"rivi_"+y}>
            {rivi.map((ruutu, x)=>{
            if(ruutu>1){
              return(
                <img key={y+"siirto"+x} src={nolla} className="Nolla" alt="nolla"
                onClick={()=>nollaaRuutu(x,y)} />
              )
            }else if(ruutu>0){
              return(
                <img key={y+"siirto"+x} src={risti} className="Risti" alt="risti"
                onClick={()=>nollaaRuutu(x,y)} />
              )
            }
            return(
              <input type="image" key={y+"siirtokuva"+x} src={ruutukuva} className="Ruutu"
                alt="ruutu" value={[x,y]} onClick={(event)=>kohtaLaudalla(event)} />
            )
            }
          )}
          </div>
          )
        })
      }
      {undefined===voittaja && <div key="alusta">
        <button onClick={()=>luovutaPeli()}>
        Keskeytys ja luovutus</button>
        </div>
      }
      {voittaja>0 && <div key="voitto">
        Voittaja on pelaaja {voittaja}
        <button onClick={()=>uusiPeli()}>
        Uudestaan uudestaan</button>
        </div>
      }
      </div>
    }
    </div>
  );
}

export default App;
