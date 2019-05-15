//address gatehub, xrp address of issuer and currency gained by adding https://data.ripple.com/v2/network/top_currencies/
//or running function issuer()
//as a fetch then collect issuer address, currency and adding to the below. 
//https://data.ripple.com/v2/network/top_markets/
//xrp Devs tools, Data API v2/ExchangeRates or V2/Normalize!
//another free API https://api.cryptowat.ch/markets/prices

//function issuer()
//{
//const fetch = require('node-fetch');
//fetch('https://data.ripple.com/v2/network/top_currencies/',)
//.then(response => response.json())
//.then(data => console.log(JSON.stringify(data.currencies)))
//}

function rippledAPIUSD()
{
const fiatrate = require('node-fetch');
fiatrate('https://data.ripple.com/v2/normalize?amount=1&currency=XRP&exchange_currency=USD&exchange_issuer=rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq',)
.then(response => response.json())
.then(data => console.log(JSON.stringify(data.rate)))

}


function rippledAPIEUR()
{
	const fiatrate = require('node-fetch');
	fiatrate('https://data.ripple.com/v2/normalize?amount=1&currency=XRP&exchange_currency=EUR&exchange_issuer=rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq',)
	.then(response => response.json())
	.then(data => console.log(JSON.stringify(data.rate)))

	}

//issuer();
rippledAPIUSD();
setInterval(rippledAPIUSD, 60000);

rippledAPIEUR();
setInterval(rippledAPIEUR, 60000);


module.exports = rippledAPIUSD, rippledAPIEUR;

//ToDo: 
// 1. make time update to latest time and date(removed this GET API requests)
// 2. to Fetch price every one minute. (think i got it)
// 3. Add option to change exchange account and base pair (usd) use top markets or top currencies for rippled ledger.
// 4. import price to ? so wage currency can equal current xrp price.
