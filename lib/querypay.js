const pay = require('./ilps') << comment this
const con = require('./con')
const ilp = require('ilp')
const spsp = require('ilp-protocol-spsp')

function querypay(){

    async function pay (recipient, amount) {
        const plugin = ilp.createPlugin()
        await plugin.connect()
        await spsp.pay(plugin, {
          receiver: recipient,
          sourceAmount: amount
        })
        
       }

  con.query("SELECT * FROM `workers` where `status` = 1", function (err, result, fields) {
    if (err) throw err;
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            // use '$spsp.ilp-test.com' if you're on the testnet
               pay(result[i].receiver,
                result[i].sourceAmount)
            console.log('Receiver: ', result[i].receiver);
            console.log('sourceAmount: ', result[i].sourceAmount);
            console.log('1 minutes wages paid to your PaymentPointer!');
        }
    } else {console.log("Nobody to pay")}
    });    
}
    module.exports = querypay;
