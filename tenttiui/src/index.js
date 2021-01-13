import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {IntlProvider} from 'react-intl'
import TenttiUI from './TenttiUI';
import reportWebVitals from './reportWebVitals';

// npm run extract -- 'src/**/*.js*' --out-file lang/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'

// npm run compile -- lang/en.json --ast --out-file compiled-lang/en.json
const localeProp='fi'

function loadLocaleData(locale) {
  console.log("TenttiUI kielipaketin lataus")
  switch (locale) {
    case 'fi':
      return import('./compiled-lang/fi.json')
    default:
      return import('./compiled-lang/en.json')
  }
}

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TenttiApp locale={localeProp}/>
      </Suspense>
    </div>
  );
}

const TenttiApp = (props) => {
  console.log("TenttiApp alkukieli")
  const [lauseet, setLauseet] = useState( null )

  useEffect(async ()=>{
    let uudetlauseet=lauseet

    try{
      uudetlauseet=await loadLocaleData(props.locale)
      console.log("Lauseet=", uudetlauseet)
      setLauseet(uudetlauseet)
    }catch(error){
      console.error(error)
    }
  },[])


  return (
    <IntlProvider
      locale={props.locale}
      defaultLocale="en"
      messages={lauseet}   
    >
      <TenttiUI />
    </IntlProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <MyComponent />
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
