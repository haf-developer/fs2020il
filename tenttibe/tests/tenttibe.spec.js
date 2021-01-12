const supertest = require('supertest')
const tenttibeapp = require('../tenttibe')
const api = supertest(tenttibeapp)
const db = require('../db/kyselyt')

// "test": "cross-env NODE_ENV=test jasmine"
// "test": "cross-env NODE_ENV=test jest --verbose --runInBand",

/*
const myReporter = {
  jasmineStarted: function(suiteInfo) {
    console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
  },

  suiteStarted: function(result) {
    console.log('Suite started: ' + result.description
      + ' whose full description is: ' + result.fullName);
  },

  specStarted: async (result)=> {
    await somethingAsync();
    console.log('Spec started: ' + result.description
      + ' whose full description is: ' + result.fullName);
  },

  specDone: function(result) {
    console.log('Spec: ' + result.description + ' was ' + result.status);

    for(var i = 0; i < result.failedExpectations.length; i++) {
      console.log('Failure: ' + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }

    console.log(result.passedExpectations.length);
  },

  suiteDone: function(result) {
    console.log('Suite: ' + result.description + ' was ' + result.status);
    for(var i = 0; i < result.failedExpectations.length; i++) {
      console.log('Suite ' + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }
  },

  jasmineDone: function(result) {
    console.log('Finished suite: ' + result.overallStatus);
    for(var i = 0; i < result.failedExpectations.length; i++) {
      console.log('Global ' + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }
  }
};

jasmine.getEnv().addReporter(myReporter)
*/

describe("paasynhallinta", ()=> {
  // console.log("Testien logitus api=", api)
  let a=null
  let webtoken=null
  console.log("a1=", a)
  let foo
  beforeAll(function() {
    foo = 1;
    db.query('SELECT * FROM henkilot' , undefined /* [req.params.id] */,
    (err, result)=>{
      if(err){
        // next(err)
      }
      // res.status(200).json(result)
      foo = result
      return foo
      })
    // console.log("beforeAll foo=", foo)
  });

  afterAll(function() {
    foo = 0;
    console.log("afterAll foo=", foo)
  });  

/*
  it("Spy testi", ()=>{
    a=function () {
      console.log('Hello World')
    }
    spyOn(console, 'log');
    a();
    expect(console.log).toHaveBeenCalledWith('Hello World');
  })
*/
  it("Tenttejä ei saada", async ()=> {
    // spyOn(console, 'log').and.callThrough()
    try{
      a=await api.get('/api/tentit').set('authorization', webtoken )
    }catch(err)
    {
      a=err
    }
    // console.log("it logi 1 a=",a)
    expect(a.status).toBe(401)
  })
  // console.log("a2=", a)

  const kayttaja={
    sahkoposti: "ei@oo.com",
    salasana: "adminpieni",
    etunimi: "Arska",
    sukunimi: "Terminator"
  }

  it("Käyttäjän luominen onnistuu", async ()=> {
    // console.log("foo 1=", foo)
    a=await api.post('/api/rekisteroi').send({kayttaja: kayttaja})
    expect(a.status).toBe(200)
  })

  it("Kirjautuminen onnistuu", async ()=> {
    a=await api.post('/api/kirjaudu').send({kayttaja: kayttaja})
    // console.log("kirjaudutuminen=", a)
    webtoken=a.res.text 
    // webtoken=a.body
    expect(a.status).toBe(200)
  })

  it("Kirjautunut kayttaja saa tentit", async ()=> {
    try{
      console.log("Tokein = ", webtoken)
      a=await api.get('/api/tentit').set('authorization', "user " + webtoken )
    }catch(err)
    {
      a=err
    }
    console.log("Saadut tentit=",a.body)
    expect(a.status).toBe(200)
  })

})
