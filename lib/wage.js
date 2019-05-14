//DOSNT WORK!!! :-(
//deductions for payments to say HRMC(tax man) Pension, Student Loan.
//can pull/push payments work here to pull/push part of the payment.


function deductions()
{
var rippledAPI = require('./rippled');
var tax = 20;

var wage = rippledAPI % tax;
console.log(wage)


}

deductions();

module.exports = deductions();
