// First coding challenge

var massMark, massJohn, heightMark, heightJohn;
massMark = 80;
massJohn = 100;
heightMark = 1.8;
heightJohn = 1.8;

var bmiMark = massMark / heightMark ^ 2;
var bmiJohn = massJohn / heightJohn ^ 2;

var bmiMarkHigher = bmiMark > bmiJohn;
console.log("Is Mark's BMI higher than John's?" + ' ' + bmiMarkHigher );
