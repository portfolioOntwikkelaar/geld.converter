import { useState } from 'react'
import ExchangeRate from "./ExchangeRate";
import axios from 'axios'


const CurrencyConverter = () => {

  const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency ] = useState('BTC')
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency ] = useState('BTC')
  const [amount, setAmount] = useState(1)
  // const [exchangeRate, setExchangeRate] = useState(0)
  // const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
  // const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')

  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: 'BTC',
    secondaryCyrrency: 'BTC',
    exchangeRate: 0

  })
  const [result, setResult] = useState(0)

  console.log(exchangedData)

  const convert = () => {


const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
  }
};

axios.request(options).then((response) => {
	console.log(response.data['Realtime Currency Exchange Rate']['8. Bid Price']);
  // setExchangeRate(response.data['Realtime Currency Exchange Rate']['8. Bid Price'])
  setResult(response.data['Realtime Currency Exchange Rate']['8. Bid Price'] * amount)
  // setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
  // setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
  setExchangedData({
    primaryCurrency: chosenPrimaryCurrency,
    secondaryCyrrency: chosenSecondaryCurrency,
    exchangeRate: response.data['Realtime Currency Exchange Rate']['8. Bid Price']
  })
}).catch((error) => {
	console.error(error);
});
  }

  return (
    <div className="currency-converter">
     <h2>

     CurrencyConverter
     </h2>
     <div className="input-box">
     <table>
       <tbody>
         <tr>
           <td>Primary Currency:</td>
           <td>
             <input type="number"
               name="currency-amount-1"
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               
             />
           </td>
           <td>
             <select  value={chosenPrimaryCurrency} name="currency-option-1" className="currency-options" onChange={(e) => setChosenPrimaryCurrency(e.target.value)}>
               {
                 currencies.map
                 (
                  (currency, _index) => (

               <option key={_index}>
                 {currency}
               </option>
                  )
                 )

               }

             </select>
           </td>
         </tr>
         <tr>
           <td>Secondary Currency:</td>
           <td>
           <input
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
           </td>
           <td>
           <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
           </td>
         </tr>
       </tbody>
     </table>

     <button id="convert-button" onClick={convert}>Convert</button>
     </div>
     <ExchangeRate exchangedData={exchangedData}
     />
    </div>
  )
}

export default CurrencyConverter;
