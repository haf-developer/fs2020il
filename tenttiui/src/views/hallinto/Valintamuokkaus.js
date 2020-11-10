import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function ValintaMuokkaus({tenttiid, kysymysid, valinnat, paluufunktiot})
{
  const [valintaamuutetaan, setValintaaMuutetaan]=useState()
  const [valintateksi, setValintaTeksti]=useState("Kirjoita uusi kysymys")
  const [uusivalintaalustettu, setUusiValintaAlustettu]=useState(false)
  
  const hoidaMuutos=(event)=>{
    if(!uusivalintaalustettu){
      setUusiValintaAlustettu(true)
      setValintaTeksti("")
    }else{
      setValintaTeksti(event.target.value)
    }
  }

  const lisaavalintaToiminto=()=>{
    const lisattavavalinta={valittu: false, teksti: valintateksi}
    paluufunktiot.lisaavalinta(tenttiid,kysymysid,lisattavavalinta)
  }

  let valintamuutos=[]
  if(valintaamuutetaan !== undefined){
    const loota=<Checkbox color="default" checked="false"
    key="lisattyvalinta" defaultChecked='false'></Checkbox>
    const tekstikentta=<input type="text" value={valintateksi} 
      onChange={event=>hoidaMuutos(event)}></input>
    const lisayspainike=<Button onClick={()=>lisaavalintaToiminto()} size="small"
      variant="contained" color="primary">Lisää valinta</Button>  
    valintamuutos.push(loota)
    valintamuutos.push(tekstikentta)
    valintamuutos.push(lisayspainike)
  }

  const useStyles = makeStyles({
    valinta: {
      outlineColor: "Black",
      outlineStyle: "Solid",
      outlineWidth: "1px",
    },
    roskis: {
      justifySelf: "center",
      alignSelf: "lastbaseline",
      color: "Black",
      backgroundColor: "Red"
    }
  })

  const classes = useStyles()

  return(
    <div>
      Valinta tentti id {tenttiid} ja kysymys id {kysymysid}
      <div className={classes.valinta} key="valintavaihtoehdot">
      { (valintaamuutetaan !== undefined) &&
        <>
        {valintamuutos}
        </>
      }
      { (valintaamuutetaan === undefined) &&
      <Button onClick={()=>setValintaaMuutetaan(true)} size="small"
      variant="contained" color="primary">Luo uusi valinta</Button>
      }
      <>
      { valinnat &&
      valinnat.map((valintarivi,vindex)=>{
        const oikeavastaus=valintarivi.oikein? valintarivi.oikein : false
        return(
          <div key={vindex+"valinta"}>
          <Checkbox color="default"
         id={valintarivi.id+"oikea"} defaultChecked={oikeavastaus}>  
         </Checkbox>
         {valintarivi.teksti}
         <Button className={classes.roskis}>Roskis</Button>
         </div>
        )
        }
      )}
      </>
      </div>
    </div>
  )
}
export default ValintaMuokkaus;