import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function KysymysMuokkaus({kysymykset, tenttiid, paluufunktio}) {
  const [naytaoikeat, setNaytaOikeat]=useState(true)

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
        <Button onClick={()=>naytaOikeatToiminto()} size="small"
        variant="contained" color="primary">Lisää kysymys</Button>
      </CardActions>
    { kysymykset &&
    <CardContent>
     Kysymyksiä {kysymykset.length}
     {kysymykset.map((rivi, index)=>{
       return(
         <div key={index+"kysymyslistasta"}>Kysymys
         {rivi.kysymys}
         {naytaoikeat &&
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
          <Button onClick={()=>naytaOikeatToiminto()} size="small"
          variant="contained" color="primary">Lisää valinta</Button>  
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