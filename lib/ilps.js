 function pay(){
 //   const plugin = require('ilp')()
 //   const SPSP = require('ilp-protocol-spsp')
//     const con = require('./conn');
//     async function run () {
//       console.log('make payment in lot every 5 secounds')
//                // use '$spsp.ilp-test.com' if you're on the testnet
//                await SPSP.pay(plugin, {
                   
//                 })
               
//       console.log('5 secounds wages paid to your paymentpointer!')
//       }
//     run().catch(e => console.error(e))
//     }
//     module.exports = pay;


const ilp = require('ilp-plugin')
const spsp = require('ilp-protocol-spsp')

async function pay (recipient, amount) {
  const plugin = ilp.createPlugin()
  await plugin.connect()
  await spsp.pay(plugin, {
    receiver: recipient,
    sourceAmount: amount
    
  })
  pay().catch(e => console.error(e))
 }
}
// sending 0.0000001 XRP
//pay('$strata-ilsp.com/testnet/spsp/strata-test', 100)
module.exports = pay;
