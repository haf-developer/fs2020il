import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import {DeleteForever} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { LisaaVaihtoehto } from './../../models/kanta'

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
    // let muuttuvatvalinnat=vanhatvalinnat.concat()
    // muuttuvatvalinnat[index].teksti=event.target.value
    // muuttuvatvalinnat[index].muutettu=true
    // setVanhatValinnat(muuttuvatvalinnat)
    // paluufunktiot.muutavalinta(tenttiid, kysymysid, index, muuttuvatvalinnat[index])
    let muutettuvalinta=valinnat[index]
    muutettuvalinta.teksti=event.target.value
    paluufunktiot.muutavalinta(tenttiid, kysymysid, index, muutettuvalinta)
  }

  const lisaavalintaToiminto=()=>{
    // LisaaVaihtoehto(dispatch, tenttiid, kysymysid, valintateksi)
    const lisattavavalinta={vaihtoehto: valintateksi, oikein: false}
    LisaaVaihtoehto(dispatch, tenttiid, kysymysid, lisattavavalinta)
    setValintaaMuutetaan()
    setUusiValintaAlustettu(false)
  }

  const useStyles = makeStyles({
    valinta: {
      margin: "1em",
      outlineColor: "Black",
      outlineStyle: "Solid",
      outlineWidth: "1px",
    },
    vanhatvalinnat: {
      width: "80vmax",
      outlineColor: "Black",
      outlineStyle: "Solid",
      outlineWidth: "1px"
    },
    roskis: {
      float: "right"
    },
    valintakentta: {
      alignContent: "Center",
      alignItems: "Center",
      verticalAlign: "Justified",
      backgroundColor: "lightgrey",
      margin: "4px",
      padding: "2px",
      outlineColor: "Black",
      outlineStyle: "Shadow",
      outlineWidth: "1px",
      width: "70vmax"
    },
    tekstilaatikko: {
      margin: "4px",
      width: "50vmax"
    }
  })

  const classes = useStyles()

  return(
    <div>
      Valinta tentti id {tenttiid} ja kysymys id {kysymysid}
      <div className={classes.valinta} key="valintavaihtoehdot">
      { (valintaamuutetaan !== undefined) &&
        <>
        <Checkbox color="default" checked={false}
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
         <TextField className={classes.tekstilaatikko} variant="outlined"
         value={valintarivi.vaihtoehto} onChange={event=>hoidaVanhanMuutos(event,vindex)}></TextField>
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