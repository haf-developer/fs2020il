import { useEffect, useState, useReducer } from 'react';
import alustusdata from './testi/testidata'
import {haeTentit} from './models/kanta'
import { Button, Toolbar, Paper } from '@material-ui/core';
import useStyles from './views/tyyli'
import './TenttiUI.css';
import TenttiLista from './views/Tenttilista'
import TenttiMuokkaus from './views/hallinto/Tenttimuokkaus'
import ChartDemo from './views/chartdemo'
import Kirjaudu from './views/Kirjaudu'
import Rekisterointi from './views/Rekisterointi'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl'

function reducer(state, action) {
  let uusidata = state? 
    (
      state.data ? {data:JSON.parse(JSON.stringify(state.data))
        ,paluufunktio:state.paluufunktio
        ,naytto:state.naytto}
      :[]
    )
    :[]
  switch (action.type){
    case "INIT":{
      console.log("reducer INIT action=", action)
      return { naytto: action.naytto }
      }
    case "REKISTEROIDY":{
      console.log("reducer REKISTEROIDY")
      return { naytto: "Rekisterointi" }      
      }
    case "REKISTEROITY":{
      console.log("reducer REKISTEROITY Voiko tehdä uudestaan?")
      return { naytto: "kirjaudu" }      
      }
    case "TALLENNA_TOKEN":{
      //"TALLENNA_TOKEN", uusitoken: saatutoken} )
      console.log("reducer TALLENNA_TOKEN action=", action)
      return {token: action.uusitoken, naytto: "kirjaudu"}
      }
    case "INIT_DATA":{
      // state.paluufunktio=action.paluufunktio
      console.log("reducer INIT_DATA action.data=", action.data)
      console.log("reducer uusidata=", uusidata)
      return ({data: action.data, naytto: "hallinnointitila"})
      }
    case 'TENTIN_NIMEN_MUUTOS':{
      console.log("reducer TENTIN_NIMEN_MUUTOS muutettutentti=", action.muutettutentti)
      if( uusidata.data !== undefined){
        const muutaindex=uusidata.data.findIndex( (tentti) =>{return tentti.id===action.muutettutentti.id } )
        uusidata.data[muutaindex]=action.muutettutentti
      }
      console.log("reducer TENTIN_NIMEN_MUUTOS datan palautus uusidata.data=", uusidata.data)
      return uusidata
      }
    case 'TENTIN_POISTO':{
      console.log("reducer TENTIN_POISTO idtentti=", action.idtentti)
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
      console.log("reducer TENTIN_LISAYS alussa uusidata=", uusidata)
      console.log("reducer TENTIN_LISAYS action=", action)
      if(undefined===uusidata.data){
        uusidata.data=[]
      }
      uusidata.data.push(action.uusitentti)
      console.log("reducer TENTIN_LISAYS datan palautus uusidata=", uusidata)
      return uusidata
      }
    case "KYSYMYS_LISAYS":{
      console.log("reducer KYSYMYS_LISAYS action=", action)
      const indeksi=uusidata.data.findIndex( (tentti) =>{return tentti.id===action.tentille } )
      if(undefined===uusidata.data[indeksi].kysymykset){
        uusidata.data[indeksi].kysymykset=[]
      }
      uusidata.data[indeksi].kysymykset.push(action.uusikysymys)
      console.log("reducer KYSYMYS_LISAYS datan palautus uusidata=", uusidata)
      return uusidata
      }
    case "VAIHTOEHTO_LISAYS":{
      console.log("reducer VAIHTOEHTO_LISAYS action=", action)
      const tentinindeksi=uusidata.data.findIndex( (tentti) =>{return tentti.id===action.tentille } )
      const kysymyksenindeksi=uusidata.data[tentinindeksi].kysymykset.findIndex( (kysymys) =>{
        return kysymys.id===action.kysymykselle } )
      if( undefined===uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi].vaihtoehdot ){
        uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi].vaihtoehdot=[]
      }
      uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi].vaihtoehdot.push(action.uusivaihtoehto)
      console.log("reducer VAIHTOEHTO_LISAYS datan palautus uusidata=", uusidata)
      return uusidata
      }
    case "VAIHTOEHTO_MUUTOS":{
      console.log("reducer VAIHTOEHTO_MUUTOS action=", action)
      const tentinindeksi=uusidata.data.findIndex( (tentti) =>{return tentti.id===action.tentille } )
      const kysymyksenindeksi=uusidata.data[tentinindeksi].kysymykset.findIndex( (kysymys) =>{
        return kysymys.id===action.kysymykselle } )
      const vaihtoehtoindeksi=uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi]
        .vaihtoehdot.findIndex((vaihtoehto) =>{
          return vaihtoehto.id===action.uusivaihtoehto.id })
      uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi].vaihtoehdot[vaihtoehtoindeksi]=action.uusivaihtoehto
      console.log("reducer VAIHTOEHTO_MUUTOS datan palautus uusidata=", uusidata)
      return uusidata
      }
    case "VAIHTOEHTO_POISTO":{
      // , tentille: idtentti, kysymykselle: idkysymys, idvaihtoehto: vaihtoehto.id})
      console.log("reducer VAIHTOEHTO_POISTO action=", action)
      const tentinindeksi=uusidata.data.findIndex( (tentti) =>{return tentti.id===action.tentille } )
      const kysymyksenindeksi=uusidata.data[tentinindeksi].kysymykset.findIndex( (kysymys) =>{
        return kysymys.id===action.kysymykselle } )
      const vaihtoehtoindeksi=uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi]
        .vaihtoehdot.findIndex((vaihtoehto) =>{
          return vaihtoehto.id===action.idvaihtoehto})

      uusidata.data[tentinindeksi].kysymykset[kysymyksenindeksi]
        .vaihtoehdot.splice(vaihtoehtoindeksi, 1)
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
  const [demoTila, setDemoTila]=useState(false)

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
    let teealustus=true
    if(state){
      if(state.naytto){
        console.log("kohta haetaan tentit")
        teealustus=false
        if(state.naytto==="kirjaudu"){
          console.log("NYT haetaan tentit")
          haeTentit(dispatch)
        }
      }
    }
    if(teealustus){
      console.log("useEffect Tehdään INIT")
      dispatch({type: "INIT", naytto: 'kirjaudu'})
    }
  },[])

  useEffect(()=>{
    console.log("use effect state muuttui")
    if(state){
      if(state.token && state.naytto==="kirjaudu"){
        haeTentit(dispatch)
      }
    }

    if(dataAlustettu){
      // window.localStorage.setItem( 'tenttidata', JSON.stringify(state.data) )
    }
  },[state])

  const valintaToiminto=(event, idtentti, idkysymys, idvalinta)=>{
    console.log("valintaToiminto idvalinta=", idvalinta)
    console.log("valintaToiminto event.target.checked=", event.target.checked)
    let uusidata=state.data.concat()
    console.log("uusidata=", uusidata)
    uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat[idvalinta].valittu=event.target.checked
    // setData(uusidata)
  }

  const classes=useStyles()

  console.log("state=", state)
  console.log("rendaus hallinnointitila=", hallinnointiTila)
  let nayttotila=false
  if(state){
    if(state.naytto){
      if(state.naytto==="kirjaudu"){
        nayttotila=true
      }
    }
  }

  console.log("NÄYTETÄÄN nayttotila=", nayttotila)

  return (
    <div >
    <title style={{backgroundColor: "red"}}>Tenttisovellus</title>
    <Paper component="header" className={classes.root} elevation={0}>
      <Toolbar className={classes.tyokalubaari} >
        <Button variant="contained" color="inherit" style={{backgroundColor: "blue"}}>
        <FormattedMessage id="id_kirjaudu_painike" defaultMessage="{p_kirjaudu_teksti}"
        values={{p_kirjaudu_teksti: 'Logga in'}}/>
          </Button>
        <Button color="inherit" onClick={()=>dispatch({type: "REKISTEROIDY"})}>Rekisteröidy</Button>
        <Button color="inherit" onClick={()=>setDemoTila(!demoTila)}>Chart demo</Button>
        <Button className={classes.painike} variant="contained"
        color="inherit">Tietoa sovelluksesta</Button>
      </Toolbar>
    </Paper>
    { state &&
    <>
    { state.naytto &&
    <>
    {
      state.naytto==="kirjaudu" &&
      <div>
      <Kirjaudu dispatch={dispatch}>
      </Kirjaudu>
      </div>
    }
    {
      state.naytto==="Rekisterointi" &&
      <div>
      <Rekisterointi dispatch={dispatch}></Rekisterointi>
      </div>
    }
    {
      state.naytto==="hallinnointitila" &&
      <div>
      <TenttiMuokkaus tentit={state}
      dispatch={dispatch}></TenttiMuokkaus>
      </div>          
    }
    </>
    }
    </>
    }
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
    { demoTila &&
      <ChartDemo></ChartDemo>
    }
    </div>
  );
}

export default TenttiUI;
