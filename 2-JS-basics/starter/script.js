// First coding challenge
/*
var massMark, massJohn, heightMark, heightJohn;
massMark = 80;
massJohn = 100;
heightMark = 1.8;
heightJohn = 1.85;

var bmiMark = massMark / (heightMark ^ 2);
var bmiJohn = massJohn / (heightJohn ^ 2);

var bmiMarkHigher = bmiMark > bmiJohn;
console.log("Is Mark's BMI higher than John's?" + ' ' + bmiMarkHigher );
*/

// Third coding challenge
/*
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
*/

// 4th coding challenge
/*
var john = {
    fullName: 'John Smith',
    mass: 100,
    height: 1.85,
    calculateBMI: function () {
        this.BMI = this.mass / (this.height ^ 2);
        return this.BMI;
    }
};

var mark = {
    fullName: 'Mark Spencer',
    mass: 100,
    height: 1.85, 
    calculateBMI: function () {
        this.BMI = this.mass / (this.height ^ 2);
        return this.BMI;
    }
};

if (mark.calculateBMI() > john.calculateBMI()) {
    console.log(mark.fullName + ' has a higher BMI of ' + mark.BMI);
} else if ( john.BMI > mark.BMI) {
    console.log(john.fullName + ' has a higher BMI of ' + john.BMI);
} else {
    console.log('Both have the same BMI');
}

*/
// 5th coding challenge

var expensesJohn = {
    fullName: 'John Smith',
    bills: [ 124, 48, 268, 180, 42 ],
    tips: [],
    totals: [],
    calculateTip: function(bill) {
        var percentage;

        if (bill < 50){ 
            percentage = 0.2;
        } else if (bill >= 50 && bill < 200) {
            percentage = 0.15;
        } else {
            percentage = 0.1;
        }
    
        return bill * percentage;
    },
    calculateTips: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips[i] = this.calculateTip(this.bills[i]);
            this.totals[i] = this.bills[i] + this.tips[i];
         }
    }
};

var expensesMark = {
    fullName: 'Mark Spencer',
    bills: [ 77, 375, 110, 45 ],
    tips: [],
    totals: [],
    calculateTip: function(bill) {
        var percentage;

        if (bill < 100){ 
            percentage = 0.2;
        } else if (bill >= 100 && bill < 300) {
            percentage = 0.1;
        } else {
            percentage = 0.25;
        }
    
        return bill * percentage;
    },
    calculateTips: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips[i] = this.calculateTip(this.bills[i]);
            this.totals[i] = this.bills[i] + this.tips[i];
         }
    }
}

expensesJohn.calculateTips();
expensesMark.calculateTips();

console.log(expensesJohn.tips, expensesJohn.totals);
console.log(expensesMark.tips, expensesMark.totals);

function averageTip (tips) {
    var total = 0;
    for (var i = 0; i < tips.length; i++) {
        total += tips[i];
    }
    return total/tips.length;
}

expensesJohn.avgTip = averageTip(expensesJohn.tips);
expensesMark.avgTip = averageTip(expensesMark.tips);

var name = expensesJohn.avgTip >expensesMark.avgTip  ? expensesJohn.fullName : expensesMark.fullName;

console.log ( name + ' had the highest avg. tip');
