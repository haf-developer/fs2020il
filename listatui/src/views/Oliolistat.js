import './../App.css';
import { DataGrid, RowsProp, ColDef} from '@material-ui/data-grid';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Oliolistat() {
  const ekalista = [
    { nimi: "Marko"},
    { nimi: "Clark Kent"},
    { nimi: "Lark Kent"}
  ]

  return (
    <div className="App" style={{ height: 200, width: '50%' }}>
    <h1>Olio Listoja</h1>
    {ekalista.map( asia=>asia.nimi)}
    </div>
  )
}
export default Oliolistat;