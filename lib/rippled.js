//address snap swap, xrp address gained rippled dev web page
//xrp Devs tools, Data API v2 / Get Exchange Rates

const fetch = require('node-fetch');
fetch('https://data.ripple.com/v2/normalize?amount=1&currency=XRP&exchange_currency=USD&exchange_issuer=rhotcWYdfn6qxhVMbPKGDF3XCKqwXar5J4',)
.then(response => response.json())
.then(data => console.log(JSON.stringify(data.rate)))

module.exports = fetch;

//ToDo: 
// 1. make time update to latest time and date
// 2. to Fetch price every one minute.
// 3. Add option to change exchange account and base pair (usd)
// 4. import price to ? so wage currency can equal current xrp price.