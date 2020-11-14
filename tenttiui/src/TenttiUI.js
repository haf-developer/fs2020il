import { useEffect, useState, useReducer } from 'react';
import alustusdata from './testi/testidata'
import axios from 'axios'
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
// import { palette } from '@material-ui/system';
import './TenttiUI.css';
import TenttiLista from './views/Tenttilista'
import TenttiMuokkaus from './views/hallinto/Tenttimuokkaus'

function reducer(state, action) {
  switch (action.type){
    case "INIT_DATA":
      return action.data
    case "VALINTA_MUUTTUI":
      return null
    default:
      throw new Error()
  }
}

function TenttiUI() {
  const [state, dispatch] = useReducer(reducer, []);
  // const [data, setData]=useState()
  const [dataAlustettu, setDataAlustettu]=useState(false)
  const [hallinnointiTila, setHallinnointi]=useState(true)

  const haestoragesta=()=>{
    const storage=window.localStorage
    let alkudata=undefined
    // storage.setItem( 'nimidata', JSON.stringify(alkudata) )
    alkudata=storage.getItem('tenttidata')
    if(!alkudata){
      storage.setItem( 'tenttidata', JSON.stringify(alustusdata) )
      alkudata=JSON.stringify(alustusdata)
    }else if(alkudata==='undefined' || alkudata===null){
      storage.setItem( 'nimidata', JSON.stringify(alustusdata) )
      alkudata=JSON.stringify(alustusdata)
    }
    alkudata=JSON.parse(alkudata)
    return alkudata
  }

  useEffect(()=>{
    // const alkudata=haestoragesta()
    let alkudata
    axios.get('http://localhost:3001/tentit')
      .then(response => {
        return response.data
      })
      .then(dbdata => {
        alkudata=dbdata
        console.log(dbdata);
        dispatch({ type: "INIT_DATA", data: alkudata })
        // setData(alkudata)
        setDataAlustettu(true)    
          }).catch(err => {
        console.error('fetch failed', err);
      });
  },[])

  useEffect(()=>{
    if(dataAlustettu){
      window.localStorage.setItem( 'tenttidata', JSON.stringify(state.data) )
    }
  },[state])

  const lisaaTentti=(tentinnimi)=>{
    let uusidata=state.data.concat()
    // uusidata[0].tentit.push({tentti: tentinnimi})
    let uusitentti={
      tentti: tentinnimi,
      kysymykset: []
    }
    axios.post('http://localhost:3001/tentit', uusitentti)
      .then(response => {
        console.log(response)
        uusitentti=response.data
        uusidata.push(uusitentti)
        // setData(uusidata)
      }).catch(err => {
        console.error('lisays epäonnistui', err);
      })
  }

  const kysymysmuokkaajat={
    lisaakysymys: (kysymysteksti, idtentti)=>{
      let uusidata=state.data.concat()
      // uusidata[0].tentit.push({tentti: tentinnimi})
      let uusikysymys={kysymys: kysymysteksti}
      if( uusidata.tentit[idtentti].kysymykset === undefined ){
        let uusikysymystaulu={
          kysymykset: []
        }
        uusidata.tentit[idtentti].push(uusikysymystaulu)
      }
      uusidata.tentit[idtentti].kysymykset.push(uusikysymys)
      // setData(uusidata)
    },
    lisaavalinta: (idtentti, idkysymys, lisattavavalinta)=>{
      let uusidata=state.data.concat()
      if( uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat === undefined ){
        /*
        let uusivalintataulu={
          valinnat: []
        }
        */
        uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat=[]
      }
      uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat.push(lisattavavalinta)
      // setData(uusidata)
    },
    poistavalinta: (idtentti, idkysymys, idvalinta) => {
      let uusidata = JSON.parse(JSON.stringify(state.data))
      uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat.splice(idvalinta,1)
      // setData(uusidata)
    },
    muutavalinta: (idtentti, idkysymys, idvalinta, muutettuvalinta) => {
      let uusidata = JSON.parse(JSON.stringify(state.data))
      uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat[idvalinta]=muutettuvalinta
      // setData(uusidata)
    }
  }

  const valintaToiminto=(event, idtentti, idkysymys, idvalinta)=>{
    console.log("valintaToiminto idvalinta=", idvalinta)
    console.log("valintaToiminto event.target.checked=", event.target.checked)
    let uusidata=state.data.concat()
    console.log("uusidata=", uusidata)
    uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat[idvalinta].valittu=event.target.checked
    // setData(uusidata)
  }

  const theme=createMuiTheme(
  {
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: "blue"
        }
      }
    },
    props: {
      MuiButton: {
        variant: "contained",
        color: "inherit",
        /*
        backgroundColor: "green"
        */
      }
    }
  }
  )

  // const vari=palette.bgcolor

  const useStyles = makeStyles({
    root: {
      contained: {
        Button: {
          backgroundColor: "red"
        }
      },
      Button: {
        color: "black",
        contained: {
          color: "black",
          backgroundColor: "red"
        },
        backgroundColor: "red"
      },
      '&:Button': {
        backgroundColor: "red"
      },
     /*
      display: "flex",
     backgroundColor: theme.palette.grey[200],
     */
     backgroundColor: "black",
    },
    tyokalubaari: {
      justifyContent: "flexend",
      justifyItems: "flexend",
      backgroundColor: theme.palette.success.dark,
    },
    painike: {
      flexGrow: 1,
      alignSelf: "flexend",
      marginLeft: "70%",
      backgroundColor: theme.palette.primary.light,
      /*
      justifyContent: "flexend",
      edge: "end",
      */
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        /*
        backgroundColor: "#808080"
        */
      },
    }
  })

  const classes = useStyles()

  console.log("state=", state)
  console.log("hallinnointitila=", hallinnointiTila)

  return (
    <div className={classes.root}>
    <title>Tenttisovellus</title>
    <AppBar position="static" color="primary">
      <Toolbar className={classes.tyokalubaari}>
        <Button variant="contained" color="inherit">Kirjaudu</Button>
        <Button variant="contained" color="inherit">Rekisteröidy</Button>
        <Button className={classes.painike} edge="end" variant="contained"
        color="inherit">Tietoa sovelluksesta</Button>
      </Toolbar>
    </AppBar>

    { !hallinnointiTila && 
    <div>
      { state &&
      state.map((rivi, index) =>{
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
      { state &&
        <div>
        <TenttiMuokkaus tentit={state} paluufunktiot={kysymysmuokkaajat}
        lisaysPaluufunktio={lisaaTentti}></TenttiMuokkaus>
        </div>          
      }
      </div>
    }
    </div>
  );
}

export default TenttiUI;
