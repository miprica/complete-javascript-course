/////////////////////////////
// CODING CHALLENGE

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
*/
( function() {
var Question = function (text, answers, correctAnswer) {
    this.text = text;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

Question.prototype.displayQuestion = function() {
    console.log(this.text);

    for (var i = 0; i < this.answers.length; i++) {
        console.log((i + 1) + '. ' + this.answers[i]);
    }
}

/*
2. Create a couple of questions using the constructor

3. Store them all inside an array
*/
var questions = [
    new Question("What language do you like most?", ['Java','C++','C#','Javascript'], 3),
    new Question("What OS do you like most?", ['MacOS','Windows','Linux'],2),
    new Question("What mobile OS do you like most?", ['iOS','Android'], 1)
];

/*
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
*/
function askQuestion() {
    var randQ = Math.floor(Math.random() * questions.length);
    questions[randQ].displayQuestion();
    return randQ;
}
/*
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
*/
function checkAnswer(q) { 
    var answer = prompt('Please select the correct answer.');

    if (answer == q.correctAnswer) {
        console.log('Correct answer!');
    } else {
        console.log('Wrong answer!');
    }
}
var q = askQuestion();
checkAnswer(questions[q]);

/*
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

})();





