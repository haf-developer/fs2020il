import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TekstiSyote from './Tekstisyote'
import TextField from '@material-ui/core/TextField';
import {DeleteForever} from '@material-ui/icons';
import useStyles from './../tyyli'
// import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { LisaaVaihtoehto, MuutaVaihtoehto } from './../../models/kanta'

function ValintaMuokkaus({tenttiid, kysymysid, valinnat, dispatch, paluufunktiot})
{
  const [valintaamuutetaan, setValintaaMuutetaan]=useState()
  const [valintateksi, setValintaTeksti]=useState("Kirjoita uusi vaihtoehto")
  const [uusivalintaalustettu, setUusiValintaAlustettu]=useState(false)
  // const [vanhatvalinnat, setVanhatValinnat]=useState(valinnat)
  
  const hoidaLisatynValinnanMuutos=(event)=>{
    if(!uusivalintaalustettu){
      setUusiValintaAlustettu(true)
      setValintaTeksti("")
    }else{
      setValintaTeksti(event.target.value)
    }
  }

  const hoidaVanhanMuutos=(event, index)=>{
    // console.log("hoidaVanhanMuutos event=", event)
    // console.log("hoidaVanhanMuutos indeksi=", index)

    // let muuttuvatvalinnat=vanhatvalinnat.concat()
    // muuttuvatvalinnat[index].teksti=event.target.value
    // muuttuvatvalinnat[index].muutettu=true
    // setVanhatValinnat(muuttuvatvalinnat)
    // paluufunktiot.muutavalinta(tenttiid, kysymysid, index, muuttuvatvalinnat[index])
  }

  const vaihtoehdonmuutospaluu=(teksti, index)=>{
    console.log("vaihtoehdonmuutospaluu teksti=", teksti)
    console.log("vaihtoehdonmuutospaluu indeksi=", index)
    let muutettuvalinta=valinnat[index]
    muutettuvalinta.vaihtoehto=teksti
    MuutaVaihtoehto(dispatch, tenttiid, kysymysid, muutettuvalinta)
  }

  const lisaavalintaToiminto=()=>{
    // LisaaVaihtoehto(dispatch, tenttiid, kysymysid, valintateksi)
    const lisattavavalinta={vaihtoehto: valintateksi, oikein: false}
    LisaaVaihtoehto(dispatch, tenttiid, kysymysid, lisattavavalinta)
    setValintaaMuutetaan()
    setUusiValintaAlustettu(false)
  }

  const classes = useStyles()

  return(
    <div>
      Valinta tentti id {tenttiid} ja kysymys id {kysymysid}
      <div className={classes.valinta} key="valintavaihtoehdot">
      { (valintaamuutetaan !== undefined) &&
        <>
        <Checkbox color="default"
          key="lisattyvalinta" defaultChecked={false}></Checkbox>
        <TextField className={classes.tekstilaatikko} 
        variant="outlined" value={valintateksi} 
          onChange={event=>hoidaLisatynValinnanMuutos(event)}></TextField>
        <Button onClick={()=>lisaavalintaToiminto()} size="small"
          variant="contained" color="primary">Lisää valinta</Button>  
        </>
      }
      { (valintaamuutetaan === undefined) &&
      <Button onClick={()=>setValintaaMuutetaan(true)} size="small"
      variant="contained" color="primary">Luo uusi valinta</Button>
      }
      <div className={classes.vanhatvalinnat}>
      { valinnat &&
      valinnat.map((valintarivi,vindex)=>{
        const oikeavastaus=valintarivi.oikein? valintarivi.oikein : false
        return(
          <div className={classes.valintakentta} key={vindex+"valinta"}>
          <Checkbox color="default"
         id={valintarivi.id+"oikea"} defaultChecked={oikeavastaus}>  
         </Checkbox>
         <TekstiSyote paluufunktio={vaihtoehdonmuutospaluu} vinkki="Muuta vaihtoehtoa" palautaid={true}
              alkuteksti={valintarivi.vaihtoehto} paluuPainallus={hoidaVanhanMuutos} paluuid={vindex}></TekstiSyote>
         <DeleteForever className={classes.roskis} 
         onClick={()=>paluufunktiot.poistavalinta(tenttiid, kysymysid, vindex)}></DeleteForever>
         </div>
        )
        }
      )}
      </div>
      </div>
    </div>
  )
}
export default ValintaMuokkaus;