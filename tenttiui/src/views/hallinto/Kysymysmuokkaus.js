import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function KysymysMuokkaus({kysymykset, tenttiid, paluufunktiot}) {
  const [naytaoikeat, setNaytaOikeat]=useState(true)
  const [kysymysteksi, setKysymysTeksti]=useState("Kirjoita uusi kysymys")
  const [uusikysymysalustettu, setUusiKysymysAlustettu]=useState(false)
  const [valintaamuutetaan, setValintaaMuutetaan]=useState()

  const hoidaMuutos=(event)=>{
    if(!uusikysymysalustettu){
      setUusiKysymysAlustettu(true)
      setKysymysTeksti("")
    }else{
      setKysymysTeksti(event.target.value)
    }
  }

  let valintamuutos=[]
  if(valintaamuutetaan !== undefined){
    const loota=<Checkbox color="default"
    key="lisattyvalinta" defaultChecked='false'>  
    </Checkbox>
    const tekstikentta=<input type="text" value="Muutettava valinta"></input>      
    valintamuutos.push(loota)
    valintamuutos.push(tekstikentta)
  }

  const naytaOikeatToiminto=()=>{
    const tila=!naytaoikeat
    setNaytaOikeat(tila)
  }

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    valinta: {
      outlineColor: "Black",
      outlineStyle: "Solid",
      outlineWidth: "1px"
    },
    roskis: {
      color: "Black",
      backgroundColor: "Red"
    }
  })

  const classes = useStyles()

  return(
    <Card className={classes.root}>
      <CardActions>
        <Button onClick={()=>paluufunktiot.lisaakysymys(kysymysteksi, tenttiid)} size="small"
        disabled={!uusikysymysalustettu} variant="contained" color="primary">Lisää kysymys</Button>
    <input key="kysymysnimi" type="text" value={kysymysteksi} onChange={event=>hoidaMuutos(event)}></input>

      </CardActions>
    { kysymykset &&
    <CardContent>
     Kysymyksiä {kysymykset.length}
     {kysymykset.map((rivi, index)=>{
       return(
         <div key={index+"kysymyslistasta"}>Kysymys
         {" -"+rivi.kysymys}
         {naytaoikeat &&
          <>
          <div>
          { (valintaamuutetaan !== undefined) &&
          <>
          { (valintaamuutetaan === index) &&
          <>
            {
              valintamuutos
            }
            </>
          }
          </>
          }
          <Button onClick={()=>setValintaaMuutetaan(index)} size="small"
          variant="contained" color="primary">Lisää valinta</Button>
          </div>
          {rivi.valinnat &&
          <>
          {rivi.valinnat.map((valintarivi,vindex)=>{
           const oikeavastaus=valintarivi.oikein? valintarivi.oikein : false
           return(
            <div className={classes.valinta} key={vindex+"valinta"}>
            <Checkbox color="default"
            id={valintarivi.id+"oikea"} defaultChecked={oikeavastaus}>  
            </Checkbox>
            {valintarivi.teksti}
            <Button className={classes.roskis}>Roskis</Button>
            </div>
           )
          })
          }
          </>
          }
          </>
          }
         </div>
       )
       })
     }
    </CardContent>
    }
      <CardActions>
        <Button onClick={()=>naytaOikeatToiminto()} size="small"
        variant="contained" color="primary">Näytä vastaukset</Button>
      </CardActions>
    </Card>     
  )
}

/*
 onClick={()=>naytaOikeatToiminto()}
 */

export default KysymysMuokkaus