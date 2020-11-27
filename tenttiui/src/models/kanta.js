import axios from 'axios'


function HaeTentit(dispatch){
  console.log("Kanta HaeTentit")
  axios.get('http://localhost:3003/api/tentit')
  .then(response => {
    return response.data
  })
  .then(dbdata => {
    console.log(dbdata);
    // const sidottupaluu=reducerpaluufunktio.bind(this)
    // const sidottupaluu=()=>{this.reducerpaluufunktio();}
    dispatch({ type: "INIT_DATA", data: {data:dbdata } })
    // setData(alkudata)
    // setDataAlustettu(true)
      }).catch(err => {
    console.error('KANTA HaeTentit fetch failed', err);
  });
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