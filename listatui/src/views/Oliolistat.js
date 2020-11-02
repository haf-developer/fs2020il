import './../App.css';
// import { DataGrid, RowsProp, ColDef} from '@material-ui/data-grid';
import { useState } from 'react';
import ReactDOM from 'react-dom';

function Oliolistat() {
  const ekalista = [
    { nimi: "Joku", sukunimi: "Tuntematon", ika: "vanha"},
    { nimi: "Clark", sukunimi: "Kent", ika: 100},
    { nimi: "Lark", sukunimi: "Kent", ika: 40},
    { nimi: "Joulu", sukunimi: "Pukki", ika: "vanhin"}
  ]

  const [lista1, setLista1]=useState(ekalista)
  const [lista2, setLista2]=useState([])
  const [siirtolista, setSiirtolista]=useState([])

  const siirtoOikealle=(alkulista, kohdelista)=>{
    const tunnisteet=siirtolista.filter(asia=>asia.lista===alkulista)
    const uuteensiirtoon=siirtolista.filter(asia=>asia.lista!==alkulista)
    if( kohdelista > 0){
      let lisaa=tunnisteet.map((asia)=>lista1[asia.index])
      const uusilista=lista1.filter(asia=>!lisaa.find(pois=>pois===asia))
      lisaa=lista2.concat(lisaa)
      setLista2(lisaa)
      setLista1(uusilista)
    }else{
      let lisaa=tunnisteet.map((asia)=>lista2[asia.index])
      const uusilista=lista2.filter(asia=>!lisaa.find(pois=>pois===asia))
      lisaa=lista1.concat(lisaa)
      setLista1(lisaa)
      setLista2(uusilista)
    }
    setSiirtolista(uuteensiirtoon)
  }

  const tapahtumaLisays1=(lista,index)=>{
    onkoSiirtolistalla(lista, index)
      ?poistaSiirtolistalta(lista,index)
      :setSiirtolista(siirtolista.concat({lista, index}))
  }

  const onkoSiirtolistalla=(lista,index)=>{
    const hakutulos=siirtolista.some(asia=>{
      return asia.lista===lista && asia.index===index
    })
    return hakutulos
  }

  const poistaSiirtolistalta=(listaosoitin,index)=>{
    const lista=siirtolista.filter((asia)=>{
      if(asia.index !== index || asia.lista !== listaosoitin){
        return asia
      }
      return undefined
    })
    setSiirtolista(lista)
  }
  
  return (
    <div>
    <h1>Olio Listoja</h1>
    <div className="Ekatyyli">
    { lista1.length===0? <div>Ei tietoja</div>:
      <table key="oliot1" className="Harjotus1"><tbody>
      {lista1.map( (asia, listaindex)=>{
        return(
          <tr className="Rivihover" key={listaindex+"ekalista"}
            onClick={()=>tapahtumaLisays1(0,listaindex)}><td>
          {asia.nimi}</td><td>{asia.sukunimi}</td><td>{asia.ika}
          </td></tr>
        )} 
      )}
      </tbody></table>
    }
    <div>
    {siirtolista.length>0
      ?
      <button onClick={()=>siirtoOikealle(0, 1)}>Siirto oikealle
      {siirtolista.length}
      </button>
      : <></>
    }
    <br/>
    {siirtolista.length>0
      ?
      <button onClick={()=>siirtoOikealle(1, 0)}>Siirto vasemmalle
      {siirtolista.length}
      </button>
      : <></>
    }
  </div>
    { lista2.length===0? <div>Ei tietoja</div>:
    <table key="oliot2" className="Harjotus1b"><tbody>
      {lista2.map( (asia, listaindex)=>{
        return(
          <tr className="Rivihover" key={listaindex+"tokalista"}
            onClick={()=>tapahtumaLisays1(1,listaindex)}><td>
          {asia.nimi}</td><td>{asia.sukunimi}</td><td>{asia.ika}
          </td></tr>
        )} 
      )}
    </tbody></table>
    }
    </div>
    </div>
  )
}
export default Oliolistat;