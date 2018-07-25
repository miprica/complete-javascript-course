// First coding challenge
/*
var massMark, massJohn, heightMark, heightJohn;
massMark = 80;
massJohn = 100;
heightMark = 1.8;
heightJohn = 1.85;

var bmiMark = massMark / heightMark ^ 2;
var bmiJohn = massJohn / heightJohn ^ 2;

var bmiMarkHigher = bmiMark > bmiJohn;
console.log("Is Mark's BMI higher than John's?" + ' ' + bmiMarkHigher );
*/

// Third coding challenge

function calculateTip(bill) {
    var percentage;
    
    if (bill < 50){ 
        percentage = 0.2;
    } else if (bill >= 50 && bill < 200) {
        percentage = 0.15;
    } else {
        percentage = 0.1;
    }

    return bill * percentage;
}

var bills = [ 124, 48, 268 ];
var tips = [calculateTip(bills[0]), 
            calculateTip(bills[1]), 
            calculateTip(bills[2])];

var totals = [bills[0] + tips[0],
            bills[1] + tips[1],
            bills[2] + tips[2]];

console.log(totals);

