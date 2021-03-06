import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ValintaMuokkaus from './Valintamuokkaus'
import { makeStyles } from '@material-ui/core/styles';
import { lisaaKysymys } from './../../models/kanta'
import { useState } from 'react';

function KysymysMuokkaus({kysymykset, tenttiid, dispatch}) {
  const [naytaoikeat, setNaytaOikeat]=useState(true)
  const [kysymysteksi, setKysymysTeksti]=useState("Kirjoita uusi kysymys")
  const [uusikysymysalustettu, setUusiKysymysAlustettu]=useState(false)
  
  const hoidaMuutos=(event)=>{
    if(!uusikysymysalustettu){
      setUusiKysymysAlustettu(true)
      setKysymysTeksti("")
    }else{
      setKysymysTeksti(event.target.value)
    }
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
        <Button onClick={()=>lisaaKysymys(dispatch, tenttiid, kysymysteksi )} size="small"
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
          <ValintaMuokkaus tenttiid={tenttiid} kysymysid={rivi.id}
          valinnat={rivi.vaihtoehdot} dispatch={dispatch}></ValintaMuokkaus>
          </div>
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
        variant="contained" color="primary">Näytä vaihtoehdot</Button>
      </CardActions>
    </Card>     
  )
}

export default KysymysMuokkaus