import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

function KysymysLista({kysymykset, tenttiid, paluufunktio}) {

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
           return(
            <div key={vindex+"valinta"}>
            <Checkbox
            onClick={(event)=>paluufunktio(event, tenttiid, index, vindex)}
            id={valintarivi.id+"val"} defaultChecked={valintarivi.valittu}>  
              </Checkbox>
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>     
  )
}

export default KysymysLista