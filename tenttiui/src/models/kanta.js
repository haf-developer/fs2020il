import axios from 'axios'

function HaeTentit(dispatch){
  console.log("Kanta HaeTentit")
  axios.get('http://localhost:3001/tentit')
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
    console.error('fetch failed', err);
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
  let uusitentti={
    tentti: tentinnimi,
    kysymykset: []
  }
  axios.post('http://localhost:3001/tentit', uusitentti)
  .then(response => {
    console.log(response)
    uusitentti=response.data
    dispatch({type: "TENTIN_LISAYS", tentinnimi: uusitentti} )
    // uusidata.data.push(uusitentti)
    // reducer( state,{ type: "INIT_DATA", data: uusidata }) 
    // state.data=uusidata
    console.log("Kanta LisaaTentti Promise tentti lisatty")

    // return uusidata
  }).catch(err => {
    console.error('Kanta LisaaTentti Promise lisaatentti epäonnistui', err);
  })

}


export { HaeTentit, LisaaTentti, PoistaTentti }