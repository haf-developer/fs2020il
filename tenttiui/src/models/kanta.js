import axios from 'axios'

const port=3003
let token=undefined
let basicconfig=undefined

const vaihtoehtohaku=(dbdata, kysymysdatat, dispatch)=>{
  console.log("KANTA vaihtoehtohaku")
  const uusidata=JSON.parse(JSON.stringify(dbdata))

  Promise.all(
    kysymysdatat.map((element, index ) => {
      uusidata[index].kysymykset=element.data
      return(
        Promise.all(
          uusidata[index].kysymykset.map(asia=>{ 
          return axios.get(`http://localhost:${port}/api/kysymykset/${asia.id}/vaihtoehdot`, basicconfig)
          })
        )
      )
    })
  ).then( vaihtoehdot =>{
    console.log("KANTA vaihtoehtohaku vaihtoehdot=", vaihtoehdot)
    vaihtoehdot.forEach( (valinnat, valintaindex)=>{
      console.log("KANTA vaihtoehtohaku vaihtoehdot valinnat=", valinnat)
      console.log("KANTA vaihtoehtohaku vaihtoehdot valinnat valintaindex =", valintaindex)
      if(valinnat.length>0){
        valinnat.forEach((promiseasiat, promiseindex)=>{
          console.log("KANTA vaihtoehtohaku vaihtoehdot promiseasiat=", promiseasiat)
          uusidata[valintaindex].kysymykset[promiseindex].vaihtoehdot=promiseasiat.data
        } )
      }
    })
    dispatch({ type: "INIT_DATA", data: uusidata })
    return vaihtoehdot
  }).catch(err => {
    console.error('KANTA vaihtoehtohaku fetch failed', err);
  })
  console.log("KANTA vaihtoehtohaku loppu")
}

const kysymyshaku=(dbdata, dispatch)=>{
  Promise.all(
    dbdata.map(asia=>{ 
    return axios.get(`http://localhost:${port}/api/tentit/${asia.id}/kysymykset`, basicconfig)
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

  axios.get(`http://localhost:${port}/api/tentit`,basicconfig)
  .then(response => {
    return response.data
  })
  .then(dbdata => { 
    console.log("Kanta HaeTentit tentit=", dbdata);
    kysymyshaku(dbdata, dispatch)
    })
    .catch(err => {
    console.error('KANTA HaeTentit epäonnistui.', err);
    console.log("Tehdään INIT")
    dispatch({type: "INIT", naytto: 'kirjaudu'} )
  })
}

function PoistaTentti( dispatch, tenttitunniste)
{
  axios.delete(`http://localhost:${port}/api/tentit/${tenttitunniste}`, basicconfig)
  .then(response => {
    console.log("KANTA PoistaTentti response=", response)
    dispatch({type: "TENTIN_POISTO", idtentti: tenttitunniste})
  }).catch(err => {
    console.log('KANTA PoistaTentti epäonnistui', err);
  })
}

function LisaaTentti(dispatch, tentinnimi){
  console.log("KANTA LisaaTentti tentinnimi=", tentinnimi)
  axios.post(`http://localhost:${port}/api/tentit`, {nimi: tentinnimi}, basicconfig)
  .then(response => {
    console.log("KANTA LisaaTentti promise response=" ,response)
    const lisattytentti=response.data[0]
    console.log("KANTA LisaaTentti lisattytentti=", lisattytentti)
    dispatch({type: "TENTIN_LISAYS", uusitentti: lisattytentti} )
    console.log("KANTA LisaaTentti Promise tentti lisatty")
    return response
  }).catch(err => {
    console.error('KANTA LisaaTentti Promise lisaatentti epäonnistui', err);
  })
  console.log("KANTA LisaaTentti Promise ilmeisesti pendaa")
}

function MuutaTentti(dispatch, id, tentinnimi, muuttuvatentti){
  console.log("Kanta MuutaTentti id ja tentinnimi=", {id,tentinnimi})
  const muuttunuttentti={...muuttuvatentti, tentti: tentinnimi }

  axios.put(`http://localhost:3001/tentit/${id}`, muuttunuttentti, basicconfig)
  .then(response => {
    console.log("Kanta MuutaTentti response=", response)
    dispatch({type: "TENTIN_NIMEN_MUUTOS", muutettutentti: muuttunuttentti} )
  }).catch(err => {
    console.log('Kanta MuutaTentti epäonnistui', err);
  })
}

function LisaaKysymys(dispatch, idtentti, kysymys){
  console.log("KANTA LisaaKysymys kysymys=", kysymys)

  axios.post(`http://localhost:${port}/api/tentit/${idtentti}/kysymykset`, {kysymys: kysymys}, basicconfig)
  .then(response => {
    console.log("KANTA LisaaKysymys promise response=" ,response)
    const lisattykysymys=response.data[0]
    console.log("KANTA LisaaKysymys lisattykysymys=", lisattykysymys)
    dispatch({type: "KYSYMYS_LISAYS", tentille: idtentti, uusikysymys: lisattykysymys} )
    console.log("KANTA LisaaKysymys Promise kysymys lisatty")
    return response
  }).catch(err => {
    console.error('KANTA LisaaKysymys Promise epäonnistui', err);
  })
  console.log("KANTA LisaaKysymys Promise ilmeisesti pendaa")
}

function LisaaVaihtoehto(dispatch, idtentti, idkysymys, vaihtoehto){
  console.log("KANTA LisaaVaihtoehto vaihtoehto=", vaihtoehto)
  // /kysymykset/:kysymysid/vaihtoehdot/
  axios.post(`http://localhost:${port}/api/kysymykset/${idkysymys}/vaihtoehdot`, {vaihtoehto: vaihtoehto}, basicconfig)
  .then(response => {
    console.log("KANTA LisaaVaihtoehto promise response=" ,response)
    const lisattyvaihtoehto=response.data[0]
    console.log("KANTA LisaaVaihtoehto lisatty vaihtoehto=", lisattyvaihtoehto)
    dispatch({type: "VAIHTOEHTO_LISAYS", tentille: idtentti, kysymykselle: idkysymys, uusivaihtoehto: lisattyvaihtoehto} )
    console.log("KANTA LisaaVaihtoehto Promise vaihtoehto lisatty")
    return response
  }).catch(err => {
    console.error('KANTA LisaaVaihtoehto Promise epäonnistui', err);
  })

  console.log("KANTA LisaaVaihtoehto poistuminen")
}

function MuutaVaihtoehto(dispatch, idtentti, idkysymys, vaihtoehto){
  console.log("KANTA MuutaVaihtoehto vaihtoehto=", vaihtoehto)
  axios.put(`http://localhost:${port}/api/vaihtoehdot/${vaihtoehto.id}`, {vaihtoehto: vaihtoehto}, basicconfig)
  .then(response => {
    console.log("KANTA MuutaVaihtoehto promise response=" ,response)
    const muutettuvaihtoehto=response.data[0]
    console.log("KANTA MuutaVaihtoehto muutettu vaihtoehto=", muutettuvaihtoehto)
    dispatch({type: "VAIHTOEHTO_MUUTOS", tentille: idtentti, kysymykselle: idkysymys, uusivaihtoehto: muutettuvaihtoehto} )
    console.log("KANTA MuutaVaihtoehto Promise vaihtoehto muutettu")
    return response
  }).catch(err => {
    console.error('KANTA MuutaVaihtoehto Promise epäonnistui', err);
  })

  console.log("KANTA MuutaVaihtoehto poistuminen")
}

function PoistaVaihtoehto(dispatch, idtentti, idkysymys, vaihtoehto_id){
  // tentitRouter.delete('/vaihtoehdot/:vaihtoehtoid'
  console.log("KANTA PoistaVaihtoehto vaihtoehto_id=",vaihtoehto_id)
  if(vaihtoehto_id){
    axios.delete(`http://localhost:${port}/api/vaihtoehdot/${vaihtoehto_id}`, basicconfig)
    .then(response => {
      console.log("KANTA PoistaVaihtoehto promise response=" ,response)
      // , tentille: idtentti, kysymykselle: idkysymys, uusivaihtoehto: muutettuvaihtoehto} )
      dispatch({type: "VAIHTOEHTO_POISTO", tentille: idtentti, kysymykselle: idkysymys, idvaihtoehto: vaihtoehto_id})

      return response
    }).catch(err => {
      console.error('KANTA PoistaVaihtoehto Promise epäonnistui', err);
    })
  }
  console.log("KANTA PoistaVaihtoehto poistuminen")
}

function Kirjautuminen(dispatch, kayttaja){
  console.log("KANTA Kirjautuminen kayttaja=", kayttaja) // email, salasana
  
  axios.post(`http://localhost:${port}/api/kirjaudu`, {kayttaja})
  .then(response => {
    console.log("KANTA Kirjautuminen promise response=" ,response)
    const saatutoken=response.data
    console.log("KANTA Kirjautuminen uusi token=", saatutoken)
    token=saatutoken
    dispatch({type: "TALLENNA_TOKEN", uusitoken: saatutoken} )
    basicconfig={headers: { Authorization: `Basic ${token}`}}
    console.log("KANTA Kirjautuminen Promise token lisatty")
    return response
  }).catch(err => {
    console.error('KANTA Kirjautuminen Promise epäonnistui', err);
  })

  console.log("KANTA Kirjautuminen poistuminen")
}

const Rekisteroityminen=((dispatch, kayttaja)=>{
  console.log("KANTA Rekisteroityminen kayttaja=", kayttaja)
  // henkilotRouter.post('/rekisteroi
  axios.post(`http://localhost:${port}/api/rekisteroi`, {kayttaja})
  .then(response => {
    console.log("KANTA Rekisteroityminen promise response=" ,response)
    dispatch({type: "REKISTEROITY"})
    return response
  }).catch(err => {
    console.error('KANTA Rekisteroityminen Promise epäonnistui', err);
  })
})

export { HaeTentit, LisaaTentti, PoistaTentti, MuutaTentti,
  LisaaKysymys,
  LisaaVaihtoehto, MuutaVaihtoehto, PoistaVaihtoehto,
  Kirjautuminen, Rekisteroityminen }