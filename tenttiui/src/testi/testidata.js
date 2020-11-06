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
        { id: 3, valittu: false, teksti: "On", oikein: true }
        ]
      },
      {
        kysymys: "Varmistava kysymys",
        valinnat: [
          { id: 1, valittu: false, teksti: "Ei"},
          { id: 2, valittu: false, teksti: "Melko varmasti"},
          { id: 3, valittu: false, teksti: "On", oikein: true }
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
          { id: 1, valittu: false, teksti: "Ehkä", oikein: true},
          { id: 2, valittu: false, teksti: "Melko varmasti", oikein: true}
          ]
        }
        ]
      },
      {
        tentti: "Kolmas Testi",
        kysymykset: [
          {
          kysymys: "Pesitkö kädet",
          valinnat: [
            { id: 1, valittu: false, teksti: "Ehkä", oikein: true},
            { id: 2, valittu: false, teksti: "Kyllä", oikein: true}
            ]
          }
          ]
        }
    ]
}]

export default alustusdata