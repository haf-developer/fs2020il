import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function KysymysMuokkaus({kysymykset, tenttiid, paluufunktio}) {
  const [naytaoikeat, setNaytaOikeat]=useState(false)

  const naytaOikeatToiminto=()=>{
    const tila=!naytaoikeat
    setNaytaOikeat(tila)
  }

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    }
  })

  const classes = useStyles()

  return(
    <Card className={classes.root}>
    <CardContent>
     Kysymyksiä {kysymykset.length}
     {kysymykset.map((rivi, index)=>{
       return(
         <div key={index+"kysymyslistasta"}>Kysymys
         {rivi.kysymys}
         {rivi.valinnat.map((valintarivi,vindex)=>{
           const oikeavastaus=valintarivi.oikein? valintarivi.oikein : false
           return(
            <div key={vindex+"valinta"}>
            <Checkbox
            onClick={(event)=>paluufunktio(event, tenttiid, index, vindex)}
            id={valintarivi.id+"val"} defaultChecked={valintarivi.valittu}>  
            </Checkbox>
            {naytaoikeat &&
            <Checkbox color="default" disabled
            id={valintarivi.id+"oikea"} defaultChecked={oikeavastaus}>  
            </Checkbox>
            }
            {valintarivi.teksti}
            </div>
           )
          })
         }
         </div>
       )
       })
     }
    </CardContent>
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