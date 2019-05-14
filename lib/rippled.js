//address gatehub, xrp address gained by adding https://data.ripple.com/v2/network/top_currencies/ as a fetch then collect issuer address and adding to the below. 
//xrp Devs tools, Data API v2 / Get Exchange Rates or Normalize!
//another free API https://api.cryptowat.ch/markets/prices

//const fetch = require('node-fetch');
//fetch('https://data.ripple.com/v2/network/top_currencies/',)
//.then(response => response.json())
//.then(data => console.log(JSON.stringify(data.currencies)))
function rippledAPI()
{
const fetch = require('node-fetch');
fetch('https://data.ripple.com/v2/normalize?amount=1&currency=XRP&exchange_currency=USD&exchange_issuer=rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq',)
.then(response => response.json())
.then(data => console.log(JSON.stringify(data.rate)))

}

rippledAPI();
setInterval(rippledAPI, 60000);


module.exports = rippledAPI;

//ToDo: 
// 1. make time update to latest time and date(removed this GET API requests)
// 2. to Fetch price every one minute. (think i got it)
// 3. Add option to change exchange account and base pair (usd)
// 4. import price to ? so wage currency can equal current xrp price.
