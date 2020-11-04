function KysymysLista({kysymykset, tenttiid, paluufunktio}) {

  return(
   <div>
     Kysymys
     {kysymykset.map((rivi, index)=>{
       return(
         <div key={index+"kysymyslistasta"}>Kysymys
         {rivi.kysymys}
         {rivi.valinnat.map((valintarivi,vindex)=>{
           return(
            <div key={vindex+"valinta"}>
            <input type="checkbox"
            onClick={(event)=>paluufunktio(event, tenttiid, index, vindex)}
            id={valintarivi.id+"val"} defaultChecked={valintarivi.valittu}></input>
            {valintarivi.teksti}
            </div>
           )
          })
         }
         </div>
       )
       })
     }
   </div> 
  )
}

export default KysymysLista