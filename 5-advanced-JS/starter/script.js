// Function constructers examples

var Person = function (name, birthYear, job) {
    this.name = name;
    this.birthYear = birthYear;
    this.job = job;
    this.calculateAge = function () {
        this.age = 2018 - this.birthYear;
    }
}

// Person.prototype.calculateAge = function () {
//     this.age = 2018 - this.birthYear;
// }

var john = new Person('John Smith', 1989, 'Designer');
var maggie = new Person('Maggie Smith', 1980, 'Programmer');

john.calculateAge();
maggie.calculateAge();

console.log(john, maggie);

// Object.create examples
var personProto = {
    calculateAge: function() {
        this.age = 2018 - this.birthYear;
    }
};

var mark = Object.create(personProto);
mark.name = "Mark Hamill";
mark.birthYear = 1978;
mark.job = 'Enginner';

mark.calculateAge();

var janet = Object.create(personProto, {
    name: {value: 'Janet'},
    birthYear: {value: 1968},
    job: {value: 'Tester'}
});

janet.calculateAge();

// First class functions examples
function calculateParkingFee(type) {
    if (type === 'RPZ') {
        return function(zone){
            return 2 * zone;
        };
    } else if (type === 'Public') {
        return function(hours) {
            return 3 * hours;
        };
    } else {
        return function(hours, price) {
            return price * hours;
        };
    }
}

var price1 = calculateParkingFee('RPZ')(5);
var price2 = calculateParkingFee('Public')(2);
var privateCalculator = calculateParkingFee('Private');

console.log(price1);
console.log(price2);
console.log(privateCalculator(2, 2));

// IIFE example
(function (x) {
    var score = 150;
    console.log(score * x);
})(2);

// Closures examples
function retirement(retirementAge) {
    var text = ' years left until retirement';
    return function(birthYear) {
        var age = 2018 - birthYear;
        console.log((retirementAge - age) + text);
    };
}

var retirementUS = retirement(65);
var retirementRO = retirement(67);
var retirementCA = retirement(63);

retirementUS(1989);
retirementRO(1989);
retirementCA(1989);

// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(name + ', can you please explain what UX design is?');
//         }
//     } else if (job === 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//     } else {
//         return function(name) {
//             console.log('Hello ' + name + ', what do you do?');
//         }
//     }
// }

function interviewQuestion(job) {
    return function(name){
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');