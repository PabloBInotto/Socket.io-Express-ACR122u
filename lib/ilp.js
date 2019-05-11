function pay(){
    const plugin = require('ilp-plugin')()
    const SPSP = require('ilp-protocol-spsp')
    const con = require('./con');
    async function run () {
      console.log('make payment in lot every 10 secounds')
      con.query("SELECT * FROM `workers` where `status` = 1", function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                // use '$spsp.ilp-test.com' if you're on the testnet
                SPSP.pay(plugin, {
                    receiver: result[i].receiver,
                    sourceAmount: result[i].sourceAmount
                })
                console.log('Receiver: ', result[i].receiver);
                console.log('sourceAmount: ', result[i].sourceAmount);                
            }
        } else {console.log("Nobody to pay")}
        });    
      console.log('1 minutes wages paid to your PaymentPointer!')
      }
    run().catch(e => console.error(e))
    }
    module.exports = pay;