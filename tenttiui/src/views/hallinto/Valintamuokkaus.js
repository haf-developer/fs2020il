import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import {DeleteForever} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function ValintaMuokkaus({tenttiid, kysymysid, valinnat, paluufunktiot})
{
  const [valintaamuutetaan, setValintaaMuutetaan]=useState()
  const [valintateksi, setValintaTeksti]=useState("Kirjoita uusi kysymys")
  const [uusivalintaalustettu, setUusiValintaAlustettu]=useState(false)
  const [vanhatvalinnat, setVanhatValinnat]=useState(valinnat)
  
  const hoidaLisatynValinnanMuutos=(event)=>{
    if(!uusivalintaalustettu){
      setUusiValintaAlustettu(true)
      setValintaTeksti("")
    }else{
      setValintaTeksti(event.target.value)
    }
  }

  const hoidaVanhanMuutos=(event, index)=>{
    let muuttuvatvalinnat=vanhatvalinnat.concat()
    muuttuvatvalinnat[index].teksti=event.target.value
    muuttuvatvalinnat[index].muutettu=true
    setVanhatValinnat(muuttuvatvalinnat)
  }

  const lisaavalintaToiminto=()=>{
    const lisattavavalinta={valittu: false, teksti: valintateksi}
    paluufunktiot.lisaavalinta(tenttiid,kysymysid,lisattavavalinta)
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
      width: "77vmax"
    },
    roskis: {
      margin: "1em",
      float: "right",
    },
    tekstilaatikko: {
      margin: "1em",
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
        <Checkbox color="default" checked="false"
          key="lisattyvalinta" defaultChecked='false'></Checkbox>
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
      { vanhatvalinnat &&
      vanhatvalinnat.map((valintarivi,vindex)=>{
        const oikeavastaus=valintarivi.oikein? valintarivi.oikein : false
        return(
          <div key={vindex+"valinta"}>
          <Checkbox color="default"
         id={valintarivi.id+"oikea"} defaultChecked={oikeavastaus}>  
         </Checkbox>
         <TextField className={classes.tekstilaatikko} value={valintarivi.teksti} variant="outlined"
         onChange={event=>hoidaVanhanMuutos(event,vindex)}></TextField>
         { valintarivi.muutettu &&
          <Button size="small" variant="contained" 
          color="primary">Tallenna muutos</Button>
         }
         <DeleteForever className={classes.roskis}>Roskis</DeleteForever>
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