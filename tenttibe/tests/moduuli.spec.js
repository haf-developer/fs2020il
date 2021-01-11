const funktiot=require("./moduuli")

describe("Testaajan testaus", function() {
  let a;

  it("testi spec eka", ()=> {
    a = true;
    expect(a).toBe(true);
  });

  it("testi hirsipuu tosi", ()=> {
    let tulos=funktiot.summa(-1,1,3)
    expect(tulos).toBe(0);
  });


})