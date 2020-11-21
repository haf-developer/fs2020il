import axios from 'axios'

/*
INSERT INTO persons (lastname,firstname) VALUES ('Smith', 'John') RETURNING id;

Optimistinen lukitus

Kirjoitusvaiheessa STALE data/object jne. jne.
Tauluissa siis versiokentät

postgresql transaction
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;
*/

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
  let lisaatentti={
    tentti: tentinnimi,
    kysymykset: []
  }
  axios.post('http://localhost:3001/tentit', lisaatentti)
  .then(response => {
    console.log("Kanta LisaaTentti promise response=" ,response)
    const lisattytentti=response.data
    console.log("Kanta LisaaTentti MIKSI EI NAY lisattytentti=", lisattytentti)
    dispatch({type: "TENTIN_LISAYS", uusitentti: lisattytentti} )
    console.log("Kanta LisaaTentti Promise tentti lisatty")
  }).catch(err => {
    console.error('Kanta LisaaTentti Promise lisaatentti epäonnistui', err);
  })
  console.log("Kanta LisaaTentti Promise ilmeisesti pendaa")
}


export { HaeTentit, LisaaTentti, PoistaTentti }