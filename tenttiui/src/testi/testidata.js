const alustusdata=[
  { etunimi: "Joku", sukunimi: "Tuntematon",
  tentit: [
    {
    tentti: "Testi",
    kysymykset: [
      {
      kysymys: "Onko oikeaa vastausta",
      valinnat: [
        { id: 1, valittu: false, teksti: "Ei"},
        { id: 2, valittu: false, teksti: "Melko varmasti"},
        { id: 3, valittu: false, teksti: "On" }
        ]
      },
      {
        kysymys: "Varmistava kysymys",
        valinnat: [
          { id: 1, valittu: false, teksti: "Ei"},
          { id: 2, valittu: false, teksti: "Melko varmasti"},
          { id: 3, valittu: false, teksti: "On" }
          ]
        }
        ]
    },
    {
      tentti: "Tosi Testi",
      kysymykset: [
        {
        kysymys: "Onko hampaat pesty",
        valinnat: [
          { id: 1, valittu: false, teksti: "Ehkä"},
          { id: 2, valittu: false, teksti: "Melko varmasti"}
          ]
        }
        ]
      }
    ]
}]

export default alustusdata