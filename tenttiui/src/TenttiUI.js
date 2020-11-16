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
  let uusidata = state? 
    (
      state.data ? {data:JSON.parse(JSON.stringify(state.data))
        ,paluufunktio:state.paluufunktio}
      :[]
    )
    :[]
  switch (action.type){
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case "INIT_DATA":{
      // state.paluufunktio=action.paluufunktio
      console.log("reducer INIT_DATA action.data=", action.data)
      return action.data
      }
    case 'TENTIN_NIMEN_MUUTOS':{
      console.log("reducer TENTIN_NIMEN_MUUTOS idtentti=", action.idtentti)

      console.log("reducer TENTIN_NIMEN_MUUTOS datan palautus")
      return uusidata
    }
    case 'TENTIN_POISTO':{
      console.log("reducer TENTIN_POISTO idtentti=", action.idtentti)
      axios.delete(`http://localhost:3001/tentit/${action.idtentti}`)
        .then(response => {
          console.log("TENTIN_POISTO response=", response)
        }).catch(err => {
          console.log('TENTIN_POISTO epäonnistui', err);
          // console.error('TENTIN_POISTO epäonnistui', err);
        })
        console.log("reducer TENTIN_poisto datan palautus uusidata=", uusidata)
        if( uusidata.data !== undefined){
          const poistaindex=uusidata.data.findIndex( (tentti) =>{return tentti.id===action.idtentti } )
          uusidata.data.splice(poistaindex, 1)
        }else{
          console.log("reducer TENTIN_poisto datan palautus uusidata ongelma=", uusidata)
        }
        console.log("reducer TENTIN_poisto datan palautus")
        return uusidata
      }
    case "TENTIN_LISAYS":{
      console.log("reducer TENTIN_LISAYS")
      let uusitentti={
        tentti: action.tentinnimi,
        kysymykset: []
      }

        
      console.log("reducer TENTIN_LISAYS datan palautus uusidata=", uusidata)
      return uusidata
      }
    case "VALINNAN_TEKSTI_MUUTTUI":
      return null
    default:
      throw new Error()
  }
}

function TenttiUI() {
  const [state, dispatch] = useReducer(reducer, undefined);
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

  const reducerpaluufunktio=(uusidatatilaan)=>{
    console.log("reducerpaluufunktio state=", state)
    console.log("reducerpaluufunktio uusidatatilaan=", uusidatatilaan)
    dispatch({ type: "INIT_DATA", data: uusidatatilaan })
    console.log("reducerpaluufunktio loppu state=", state)
  }

  useEffect(()=>{
    // const alkudata=haestoragesta()
    axios.get('http://localhost:3001/tentit')
      .then(response => {
        return response.data
      })
      .then(dbdata => {
        console.log(dbdata);
        const sidottupaluu=reducerpaluufunktio.bind(this)
        // const sidottupaluu=()=>{this.reducerpaluufunktio();}
        dispatch({ type: "INIT_DATA", data: {data:dbdata, paluufunktio:sidottupaluu} })
        // setData(alkudata)
        setDataAlustettu(true)    
          }).catch(err => {
        console.error('fetch failed', err);
      });
  },[])

  useEffect(()=>{
    console.log("use effect state muuttui")
    if(dataAlustettu){
      // window.localStorage.setItem( 'tenttidata', JSON.stringify(state.data) )
    }
  },[state])


  const kysymysmuokkaajat={
    lisaatentti: (tenttiteksti)=>{
      console.log("Paluufunktio lisaatentti tenttiteksti=", tenttiteksti)

      let uusitentti={
        tentti: tenttiteksti,
        kysymykset: []
      }

      axios.post('http://localhost:3001/tentit', uusitentti)
        .then(response => {
          console.log(response)
          uusitentti=response.data
          // uusidata.data.push(uusitentti)
          // reducer( state,{ type: "INIT_DATA", data: uusidata }) 
          // state.data=uusidata
          console.log("Paluufunktio lisaatentti  tentti lisatty")

          // return uusidata
        }).catch(err => {
          console.error('Paluufunktio lisaatentti epäonnistui', err);
        })
    },
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
        /*
        color: "default",
        */
        backgroundColor: "green"
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
     backgroundColor: theme.palette.grey[300],
    },
    tyokalubaari: {
      justifyContent: "flexend",
      justifyItems: "flexend",
      backgroundColor: theme.palette.primary.main,
    },
    painike: {
      flexGrow: 1,
      alignSelf: "flexend",
      marginLeft: "70%",
      backgroundColor: theme.palette.primary.main,
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

  // console.log("state=", state)
  console.log("rendaus hallinnointitila=", hallinnointiTila)

  return (
    <div className={classes.root}>
    <title>Tenttisovellus</title>
    <AppBar position="static"
    style={{backgroundColor: "blue"}}>
      <Toolbar className={classes.tyokalubaari} >
        <Button variant="contained" color="inherit" style={{backgroundColor: "blue"}}>Kirjaudu</Button>
        <Button variant="contained" color="inherit">Rekisteröidy</Button>
        <Button className={classes.painike} variant="contained"
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
        dispatch={dispatch}></TenttiMuokkaus>
        </div>          
      }
      </div>
    }
    </div>
  );
}

export default TenttiUI;
