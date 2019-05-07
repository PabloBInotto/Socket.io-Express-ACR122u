function pay(){
const plugin = require('ilp-plugin')()
const SPSP = require('ilp-protocol-spsp')

async function run () {
  console.log('Worker Starting Work')

  // use '$spsp.ilp-test.com' if you're on the testnet
  await SPSP.pay(plugin, {
    receiver: '$57b9c402f3766774.localtunnel.me',
    sourceAmount: '20'
  })

  console.log('1 minutes wages paid to your paymentpointer!')
  }

run().catch(e => console.error(e))
}
module.exports = pay;