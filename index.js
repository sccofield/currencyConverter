const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}
registerServiceWorker();

const fetchCurrencies = async () => {
  const currencyApi = 'https://free.currencyconverterapi.com/api/v5/currencies'
  const fromCurrencyDiv = document.getElementById('fromCurrency');
  const toCurrencyDiv = document.getElementById('toCurrency');

  let response = await fetch(currencyApi);
  const result = await response.json();
  const currencies = result;

  for (currency in currencies.results) {
    let optionFromCurrency = document.createElement('option');
    let optionToCurrency = document.createElement('option');

    optionFromCurrency.name = currencies.results[currency].id;
    optionFromCurrency.text = currencies.results[currency].id;

    optionToCurrency.name = currencies.results[currency].id;
    optionToCurrency.text = currencies.results[currency].id;

    fromCurrencyDiv.appendChild(optionFromCurrency);
    toCurrencyDiv.appendChild(optionToCurrency);
  }


}
fetchCurrencies()

const onFormSubmit = async (event) => {
  event.preventDefault();
  const amount = document.getElementById('amount').value
  const fromCurrency = document.getElementById('fromCurrency').value
  const toCurrency = document.getElementById('toCurrency').value
  const converterApi = `https://free.currencyconverterapi.com/api/v5/convert?q=${fromCurrency}_${toCurrency}&compact=y`
  
   let response = await fetch(converterApi);
   const result = await response.json();
   const conversionRate = result[`${fromCurrency}_${toCurrency}`].val
   const newAmount = amount * conversionRate
   let resultDiv = document.getElementById('resultDiv')
   resultDiv.classList.add("resultDiv");
   const finalResult = `${amount} ${fromCurrency}   equals ${newAmount} ${toCurrency}`;

   resultDiv.innerHTML = finalResult;

}








