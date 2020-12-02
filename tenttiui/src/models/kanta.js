import axios from 'axios'

const port=3003

const vaihtoehtohaku=(dbdata, kysymysdatat, dispatch)=>{
  console.log("KANTA vaihtoehtohaku")
  const uusidata=JSON.parse(JSON.stringify(dbdata))

  Promise.all(
    kysymysdatat.map((element, index ) => {
      uusidata[index].kysymykset=element.data
      // console.log("PITUUS TARKISTUS arraytype=", Array.isArray(uusidata[index].kysymykset))
      return(
        uusidata[index].kysymykset.map(asia=>{ 
        return axios.get(`http://localhost:${port}/api/kysymykset/${asia.id}/vaihtoehdot`)
        })
      )
    })
  ).then( vaihtoehdot =>{
    console.log("KANTA vaihtoehtohaku vaihtoehdot=", vaihtoehdot)
    dispatch({ type: "INIT_DATA", data: {data:uusidata } })
    return vaihtoehdot
  }).catch(err => {
    console.error('KANTA vaihtoehtohaku fetch failed', err);
  })
  console.log("KANTA vaihtoehtohaku loppu")
}

const kysymyshaku=(dbdata, dispatch)=>{
  Promise.all(
    dbdata.map(asia=>{ 
    return axios.get(`http://localhost:${port}/api/tentit/${asia.id}/kysymykset`)
    }))
    .then( kysymysdatat => {
      console.log("Kanta kysymyshaku kysymysdatat=", kysymysdatat);
      vaihtoehtohaku(dbdata, kysymysdatat, dispatch)
      return kysymysdatat
    }
  ).catch(err => {
    console.error('KANTA kysymyshaku fetch failed', err);
  })
  console.log("KANTA kysymyshaku loppu")
}

function HaeTentit(dispatch){
  console.log("Kanta HaeTentit")
  axios.get(`http://localhost:${port}/api/tentit`)
  .then(response => {
    return response.data
  })
  .then(dbdata => { 
    console.log("Kanta HaeTentit tentit=", dbdata);
    kysymyshaku(dbdata, dispatch)
    })
    .catch(err => {
    console.error('KANTA HaeTentit fetch failed', err);
  })
}

function PoistaTentti( dispatch, tenttitunniste)
{
  axios.delete(`http://localhost:3001/tentit/${tenttitunniste}`)
  .then(response => {
    console.log("Kanta PoistaTentti response=", response)
    dispatch({type: "TENTIN_POISTO", idtentti: tenttitunniste})
  }).catch(err => {
    console.log('Kanta PoistaTentti epäonnistui', err);
    // console.error('TENTIN_POISTO epäonnistui', err);
  })
}

function LisaaTentti(dispatch, tentinnimi){
  console.log("Kanta LisaaTentti tentinnimi", tentinnimi)
  let lisaatentti={
    tentti: tentinnimi,
    kysymykset: []
  }
  axios.post('http://localhost:3001/tentit', lisaatentti)
  .then(response => {
    console.log("Kanta LisaaTentti promise response=" ,response)
    const lisattytentti=response.data
    console.log("Kanta LisaaTentti lisattytentti=", lisattytentti)
    dispatch({type: "TENTIN_LISAYS", uusitentti: lisattytentti} )
    console.log("Kanta LisaaTentti Promise tentti lisatty")
  }).catch(err => {
    console.error('Kanta LisaaTentti Promise lisaatentti epäonnistui', err);
  })
  console.log("Kanta LisaaTentti Promise ilmeisesti pendaa")
}

function MuutaTentti(dispatch, id, tentinnimi, muuttuvatentti){
  console.log("Kanta MuutaTentti id ja tentinnimi=", {id,tentinnimi})
  const muuttunuttentti={...muuttuvatentti, tentti: tentinnimi }

  axios.put(`http://localhost:3001/tentit/${id}`, muuttunuttentti)
  .then(response => {
    console.log("Kanta MuutaTentti response=", response)
    dispatch({type: "TENTIN_NIMEN_MUUTOS", muutettutentti: muuttunuttentti} )
  }).catch(err => {
    console.log('Kanta MuutaTentti epäonnistui', err);
  })
}

export { HaeTentit, LisaaTentti, PoistaTentti, MuutaTentti }