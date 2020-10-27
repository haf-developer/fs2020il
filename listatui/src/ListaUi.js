import './App.css';
import { DataGrid, RowsProp, ColDef} from '@material-ui/data-grid';
import { useState } from 'react';
// import { Grid } from '@material-ui/core';

function ListaUi() {
  const ekalista = [
    "Juuso",
    "Marko",
    "Matti",
    "Clark"
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
  const [siirtolista, setSiirtolista]=useState()
  
  const siirtoOikealle=(()=>{
    const uusilista=lista1kopio.concat(lista1)
    setLista1kopio(uusilista)
    const poistolista=lista1.filter(()=>undefined)
    setLista1(poistolista)
  })

  const siirtoVasemmalle=(()=>{
  })

  const valintaMuutos=((event)=>{
    let uusilista=new Array(siirtolista)
    event.target.checked===true? uusilista.push(event.target.value) :
      uusilista=uusilista.filter((asia)=>asia!==event.target.value)
    setSiirtolista(uusilista)
  })

  return (
    <div className="App" style={{ height: 400, width: '100%' }}>
      <h1>Listoja</h1>
      <h2>
      Eka
      </h2>
      <table className="Harjotus1">
        <tbody>
        {lista1.map( rivi=>{
          return(
            <tr><td>
            <input type="checkbox" id={rivi} value={rivi} onChange={(event)=>valintaMuutos(event)} />
            <label for={rivi}>{rivi}</label>
            </td></tr>
          )}
        )}
        </tbody>
      </table>
      <button onClick={(()=>siirtoOikealle())}>Nuoli alas {siirtolista}</button>
      <br/>
      <button>Nuoli ylos</button>
      <table className="Harjotus1b">
        <tbody>
        {lista1kopio.map( rivi=>{
          return(
            <tr className="Harjotus1b">
              <td>
            <input type="checkbox" id={rivi} value={rivi} />
            <label for={rivi}>{rivi}</label>
            </td></tr>
          )}
        )}
        </tbody>
      </table>

      <h2>
      Viimeinen
      </h2>
      <DataGrid checkboxSelection rows={rivit} columns={sarakkeet}  pageSize={5} >
      Teksti ei tule ruudulle
      </DataGrid>
    </div>
  );
}

export default ListaUi;
