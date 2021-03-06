import './../App.css';
import { DataGrid, RowsProp, ColDef} from '@material-ui/data-grid';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Peruslistat() {
  const ekalista = [
    "Juuso",
    "Marko",
    "Matti",
    "Clark Kent",
    "Lark Kent"
  ]


  const rivit: RowsProp = [
    // const rivit = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

  const sarakkeet: ColDef[] = [
  // const sarakkeet = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${
          params.getValue('lastName') || ''
        }`,
    },
  ];

  const [lista1, setLista1]=useState(ekalista)
  const [lista1kopio, setLista1kopio]=useState(ekalista.map( (esine, indeksi)=>esine+" "+indeksi))
  const [siirtolista, setSiirtolista]=useState([])
  
  useEffect( (()=>{
    // console.log('printing', ReactDOM.findDOMNode(document.getElementById('ekalistataulu')))
    let lista1cb=ReactDOM.findDOMNode(document.getElementById('ekalistataulu')).getElementsByClassName('ekalistacb')
    lista1cb=[...lista1cb]
    // console.log("lista1cb=", lista1cb)
    lista1cb.forEach( cb => cb.checked=false)
  }), [lista1] )

  const siirtoOikealle=(()=>{
    const poistolista=lista1.filter((asia)=>siirtolista.includes(asia))
    const uusisiirtolista=siirtolista.filter((asia)=>!poistolista.includes(asia))
    const uusilista=lista1kopio.concat(poistolista)
    setLista1kopio(uusilista)
    const uusilista1=lista1.filter((asia)=>!poistolista.includes(asia))
    setLista1(uusilista1)
    setSiirtolista(uusisiirtolista)
  })

  const siirtoVasemmalle=(()=>{
  })

  const valintaMuutos=((event)=>{
    let uusilista=siirtolista.slice()
    event.target.checked===true? uusilista.push(event.target.value) :
      uusilista=uusilista.filter((asia)=>{
        // console.log("asia=", asia)
        // console.log("event.target.value=", event.target.value)
        // console.log("event.target.value===asia = ", event.target.value===asia)
        return asia!==event.target.value})
    setSiirtolista(uusilista)
  })

  return (
    <div>
    <h2>Perus Listoja</h2>
    <div className="Ekatyyli">
      <table id="ekalistataulu" key="ekalista" className="Harjotus1">
        <tbody>
        {lista1.map( (rivi, index)=>{
          return(
            <tr key={`ekalista_tr${index}`}><td>
            <input className="ekalistacb" type="checkbox" id={rivi} value={rivi} onChange={(event)=>valintaMuutos(event)} />
            <label htmlFor={rivi}>{rivi}</label>
            </td></tr>
          )}
        )}
        </tbody>
      </table>
      <div className="Nuolipainikkeet">
      <button onClick={(()=>siirtoOikealle())}>Siirto oikealle
        {siirtolista}
      </button>
      <br/>
      <button>Siirto vasemmalle</button>
      </div>
      <table className="Harjotus1b">
        <tbody>
        {lista1kopio.map( (rivi, index)=>{
          return(
            <tr key={`tokalista_tr${index}`} className="Harjotus1b">
              <td>
            <input type="checkbox" id={rivi} value={rivi} />
            <label htmlFor={rivi}>{rivi}</label>
            </td></tr>
          )}
        )}
        </tbody>
      </table>
      </div>
      <div className="Toinentyyli">
      <h2>
      Viimeinen
      </h2>
      <DataGrid checkboxSelection rows={rivit} columns={sarakkeet}  pageSize={5} >
      Teksti ei tule ruudulle
      </DataGrid>
      </div>
    </div>
  )
}
export default Peruslistat;