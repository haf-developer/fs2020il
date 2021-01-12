import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {IntlProvider} from 'react-intl'
import TenttiUI from './TenttiUI';
import reportWebVitals from './reportWebVitals';

// npm run extract -- 'src/**/*.js*' --out-file lang/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'

// npm run compile -- lang/en.json --ast --out-file compiled-lang/en.json
const localeProp='en'

function loadLocaleData(locale: string) {
  switch (locale) {
    case 'fr':
      return import('./compiled-lang/fi.json')
    default:
      return import('./compiled-lang/en.json')
  }
}


async function bootstrapApplication(locale) {
  const messages = await loadLocaleData(locale)

ReactDOM.render(
  
  <React.StrictMode>
    <IntlProvider locale={localeProp} key={localeProp}>
    <TenttiUI />
    </IntlProvider>
    messages={messages}
  </React.StrictMode>
  ,document.getElementById('root')
);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
