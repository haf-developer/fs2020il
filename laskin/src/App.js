import React, { useState, useEffect } from 'react';

function App() {
  const [tulos, setTulos]=useState()
  const [luku1, setLuku1]=useState('')
  const [luku2, setLuku2]=useState('')
  const [operaattori, setOperaattori]=useState()

  const nappiaPainettu=(event)=>{
    if( operaattori ){
      setLuku2(luku2 + event.target.value)
    }else{
      setLuku1(luku1 + event.target.value)
    }
  }

  const valittuOperaattori=(event)=>{
    setOperaattori(event.target.value)
  }

  const resetoiArvot=()=>{
    setOperaattori(undefined)
    setLuku1('')
    setLuku2('')
    setTulos()
  }

  const luku1Muuttunut = (event)=>{
    setLuku1(event.target.value)
    console.log("luku1 muuttuu")
  }

  const luku2Muuttunut = (event)=>{
    setLuku2(event.target.value)
    console.log("luku2 muuttuu")
  }

  const laskeVastaus = ()=>{
    const arvo1=parseInt(luku1, 10)
    const arvo2=parseInt(luku2, 10)
    if(arvo1 && arvo2){
      setTulos(operaatiot[operaattori](arvo1,arvo2))
    }
  }

  const operaatiot={
    '+': ((a,b)=>a+b),
    '-': ((a,b)=>a-b),
    '*': ((a,b)=>a*b),
    '/': ((a,b)=>a/b)
  }

  const numerot=[...Array(10).keys()]

  return (
    <div className="App">
      <h1>Laskin</h1>
    <br/>
    {numerot.map( (i) =>{
      return(
        <button key={i+"nappula"} value={i}
          onClick={(event)=>nappiaPainettu(event)} >
              {i}</button>
          )
        })
      }
    <br/>
    'Luku 1 '
    <input onChange={(event)=>luku1Muuttunut(event)} value={luku1}>
    </input><br/>
      {Object.keys(operaatiot).map( (i)=>{
        return(
          <button key={i+"nappula"} value={i}
            onClick={(event)=>valittuOperaattori(event)} >
            {i}</button>
        )
        })
      }
    <br/>
    <button onClick={()=>resetoiArvot()}>resetoi</button>
    <br/>
    'Luku 2 '
    <input type="text" onChange={(event)=>luku2Muuttunut(event)} value={luku2}>
    </input><br/>
    <button onClick={()=>laskeVastaus()}>Laske</button>
    <br/>
    Tulos on {tulos}
    </div>
  );
}

export default App;
