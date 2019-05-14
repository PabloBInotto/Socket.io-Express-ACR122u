//coinbase pro, xrp address gained from https://ledger.exposed/rich-stats.
const fetch = require('node-fetch');
fetch('https://data.ripple.com/v2/exchange_rates/USD+rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q/XRP?date=2019-05-13T00:10:00Z',)
.then(response => response.json())
.then(data => console.log(JSON.stringify(data.rate)))

module.exports = fetch;
//ToDo: 
// 1. make time update to latest time and date
// 2. to Fetch price every one minute.
// 3. Add option to change exchange account and base pair (usd)
// 4. import price to ? so wage currency can equal current xrp price.