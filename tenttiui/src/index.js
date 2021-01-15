import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {IntlProvider} from 'react-intl'
import TenttiUI from './TenttiUI';
import reportWebVitals from './reportWebVitals';

// npm run extract -- 'src/**/*.js*' --out-file lang/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'
// npm run extract -- 'src/**/*.js*' --ignore 'src/compiled-lang/*' --out-file lang/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'
// npm run extract -- 'src/**/*.js*' --ignore 'src/compiled-lang/*' --additional-function-names ['defineMessages'] --out-file lang/fi.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'
// npm run compile -- lang/en.json --ast --out-file compiled-lang/en.json

// npm run compile-folder
// formatjs compile-folder [options] <folder> <outFolder>

/*
Autoid issue
https://github.com/formatjs/formatjs/issues/1901
*/

const varmistusLokaali="fi"
const localeProp="se"

function loadLocaleData(locale) {
  console.log("TenttiUI kielipaketin lataus kielelle ", locale)
  if (locale) {
    if(locale.length > 1){
      return import(`./compiled-lang/${locale}.json`)
    }
  }
  return import(`./compiled-lang/${varmistusLokaali}.json`)
}


const TenttiApp = (props) => {
  console.log("TenttiApp alkukieli")
  const [lauseet, setLauseet] = useState(null)
  const [lokaali, setLokaali] = useState(props.locale)

  useEffect( ()=>{
    kieliLataus(props.locale)
  },[])

  const kieliLataus=async (lokaalitunnus)=>{
    let uudetlauseet=lauseet
    try{
      uudetlauseet=await loadLocaleData(lokaalitunnus)
      console.log("Lauseet=", uudetlauseet)
      setLauseet(uudetlauseet)
      setLokaali(lokaalitunnus)
    }catch(error){
      console.error(error)
    }
  }

  const hoidaKielenvaihto=(kielitunnus)=>{
    kieliLataus(kielitunnus)
  }

  return (
    <div>
    { lauseet && 
    <IntlProvider
      locale={lokaali}
      defaultLocale={varmistusLokaali}
      messages={lauseet}   
    >
      <TenttiUI hoidaKieliMuutos={hoidaKielenvaihto} />
    </IntlProvider>
    }
    { (lauseet == null) &&
    <div>
    Alustetaan
    </div>
  }
  </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <TenttiApp locale={localeProp}/>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
async function bootstrapApplication(locale, mainDiv) {
  const messages = await loadLocaleData(locale)
  ReactDOM.render(<TenttiApp locale={locale} messages={messages} />, mainDiv)
}
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
