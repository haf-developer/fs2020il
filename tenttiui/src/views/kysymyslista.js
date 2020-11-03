function KysymysLista(kysymykset) {

  return(
   <div>
     Kysymys
     {kysymykset.kysymykset.map((rivi, index)=>{
       return(
         <div key={index+"kysymyslistasta"}>Kysymys
         {rivi.kysymys}
         {rivi.valinnat.map((valintarivi,vindex)=>{
           return(
            <div key={vindex+"valinta"}>
            <input type="checkbox" id={valintarivi.id+"val"}></input>
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