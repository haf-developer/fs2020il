import { useEffect, useState } from 'react';
import alustusdata from './testi/testidata'
import axios from 'axios'
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './TenttiUI.css';
import TenttiLista from './views/Tenttilista'
import TenttiMuokkaus from './views/hallinto/Tenttimuokkaus'

function TenttiUI() {

  const [data, setData]=useState()
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
        setData(alkudata)
        setDataAlustettu(true)    
          }).catch(err => {
        console.error('fetch failed', err);
      });
  },[])

  useEffect(()=>{
    if(dataAlustettu){
      window.localStorage.setItem( 'tenttidata', JSON.stringify(data) )
    }
  },[data])

  const lisaaTentti=(tentinnimi)=>{
    let uusidata=data.concat()
    // uusidata[0].tentit.push({tentti: tentinnimi})
    let uusitentti={
      tentti: tentinnimi,
      kysymykset: []
    }
    axios.post('http://localhost:3001/tentit', uusitentti)
      .then(response => {
        console.log(response)
        uusidata.push(uusitentti)
        setData(uusidata)    
      })
  }

  const kysymysmuokkaajat={
    lisaakysymys: (kysymysteksti, idtentti)=>{
      let uusidata=data.concat()
      // uusidata[0].tentit.push({tentti: tentinnimi})
      let uusikysymys={kysymys: kysymysteksti}
      if( uusidata.tentit[idtentti].kysymykset === undefined ){
        let uusikysymystaulu={
          kysymykset: []
        }
        uusidata.tentit[idtentti].push(uusikysymystaulu)
      }
      uusidata.tentit[idtentti].kysymykset.push(uusikysymys)
      setData(uusidata)
    },
    lisaavalinta: (idtentti, idkysymys, lisattavavalinta)=>{
      let uusidata=data.concat()
      if( uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat === undefined ){
        /*
        let uusivalintataulu={
          valinnat: []
        }
        */
        uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat=[]
      }
      uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat.push(lisattavavalinta)
      setData(uusidata)
    },
    poistavalinta: (idtentti, idkysymys, idvalinta) => {
      let uusidata = JSON.parse(JSON.stringify(data))
      uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat.splice(idvalinta,1)
      setData(uusidata)
    },
    muutavalinta: (idtentti, idkysymys, idvalinta, muutettuvalinta) => {
      let uusidata = JSON.parse(JSON.stringify(data))
      uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat[idvalinta]=muutettuvalinta
      setData(uusidata)
    }
  }

  const valintaToiminto=(event, idtentti, idkysymys, idvalinta)=>{
    console.log("valintaToiminto idvalinta=", idvalinta)
    console.log("valintaToiminto event.target.checked=", event.target.checked)
    let uusidata=data.concat()
    console.log("uusidata=", uusidata)
    uusidata.tentit[idtentti].kysymykset[idkysymys].valinnat[idvalinta].valittu=event.target.checked
    setData(uusidata)
  }

  const useStyles = makeStyles({
    root: {
      flexGrow: 1
    },
    painike: {
      flexGrow: 1,
      edge: "end",
      '&:hover': {
        backgroundColor: "#808080"
      },
    }
  })

  const classes = useStyles()

  return (
    <div className="App">
    <title>Tenttisovellus</title>
    <AppBar position="static">
      <Toolbar>
        <Button variant="containedPrimary" color="inherit">Kirjaudu</Button>
        <Button variant="containedPrimary" color="inherit">Rekisteröidy</Button>
        <Button className={classes.painike} edge="end" variant="containedPrimary" color="inherit">Tietoa sovelluksesta</Button>
      </Toolbar>
    </AppBar>

    { !hallinnointiTila && 
    <div>
      { data &&
      data.map((rivi, index) =>{
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
      { data &&
        <div>
        <TenttiMuokkaus tentit={data} paluufunktiot={kysymysmuokkaajat}
        lisaysPaluufunktio={lisaaTentti}></TenttiMuokkaus>
        </div>          
      }
      </div>
    }
    </div>
  );
}

export default TenttiUI;
