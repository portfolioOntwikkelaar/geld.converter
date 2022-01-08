import { useState } from 'react'
import ExchangeRate from "./ExchangeRate";
import axios from 'axios'


const CurrencyConverter = () => {

  const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency ] = useState('BTC')
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency ] = useState('BTC')
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [result, setResult] = useState(0)

  console.log(amount)

  const convert = () => {


const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': 'cec1cb9e4amshf0a6688364e5f06p1b2e12jsna57095c61d25'
  }
};

axios.request(options).then((response) => {
	console.log(response.data['Realtime Currency Exchange Rate']['8. Bid Price']);
  setExchangeRate(response.data['Realtime Currency Exchange Rate']['8. Bid Price'])
  setResult(response.data['Realtime Currency Exchange Rate']['8. Bid Price'] * amount)
}).catch((error) => {
	console.error(error);
});
  }
  console.log(exchangeRate)
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
             <select  value={setChosenSecondaryCurrency} name="currency-option-2" className="currency-options" onChange={(e) => setChosenSecondaryCurrency(e.target.value)}>
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
       </tbody>
     </table>

     <button id="convert-button" onClick={convert}>Convert</button>
     </div>
     <ExchangeRate exchangeRate={exchangeRate}
       chosenPrimaryCurrency={chosenPrimaryCurrency}
       chosenSecondaryCurrency={chosenSecondaryCurrency}
     />
    </div>
  )
}

export default CurrencyConverter;
