/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, isFinished, activePlayer, previousDice;
var currentScoresDOM, globalScoresDOM, diceDOM;

init();

function init () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;
    isFinished = false;

    
    currentScoresDOM = [document.getElementById('current-0'), 
                        document.getElementById('current-1')];
    globalScoresDOM = [document.getElementById('score-0'), 
                       document.getElementById('score-1')];

    // Reset scores
    currentScoresDOM[0].textContent = 0;
    currentScoresDOM[1].textContent = 0;
    globalScoresDOM[0].textContent = 0;
    globalScoresDOM[1].textContent = 0;

    // Hide dice
    diceDOM = [ document.getElementById('dice-0') ,
                document.getElementById('dice-1')];
    
    diceDOM[0].style.display = 'none';
    diceDOM[1].style.display = 'none';

    // Reset formatings
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isFinished) {
        return;
    }
    var dice = [0,0];
    dice[0] = Math.floor(Math.random() * 6) + 1;
    dice[1] = Math.floor(Math.random() * 6) + 1;
    
    // Display dices
    diceDOM[0].src = 'dice-' + dice[0] + '.png';
    diceDOM[1].src = 'dice-' + dice[1] + '.png';

    diceDOM[0].style.display = 'block';
    diceDOM[1].style.display = 'block';

    if (dice[0] !== 1 && dice[1] !== 1) {
        // Update round score
        roundScore += dice[0] + dice[1];

        // Update current scores
        currentScoresDOM[activePlayer].textContent = roundScore;
    } else {
        nextPlayer();
    }
    /*
    if (dice === 6 && previousDice === 6) {
        scores[activePlayer] = 0;
        globalScoresDOM[activePlayer].textContent = 0;
        nextPlayer();
    } else if (dice !== 1) {
        // Update round score
        roundScore += dice;
        previousDice = dice;
        // Update current scores
        currentScoresDOM[activePlayer].textContent = roundScore;
    } else {
        nextPlayer();
    }
    */
});

function nextPlayer() {
    roundScore = 0;

    // Reset players score
    currentScoresDOM[activePlayer].textContent = 0;

    // Switch formattings
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    // Hide dice
    diceDOM[0].style.display = 'none';
    diceDOM[1].style.display = 'none';

    activePlayer = activePlayer == 0 ? 1 : 0;
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isFinished) {
        return;
    }
    scores[activePlayer] += roundScore;
    // Update score
    globalScoresDOM[activePlayer].textContent = scores[activePlayer];

    var input = document.querySelector('.winning-score').value;
    var winningScore = 100;
    
    if (input) {
        winningScore = input;
    } 

    // Check if winner
    if (scores[activePlayer] >= winningScore) {

        // Apply winner formatting
        document.getElementById('name-' + activePlayer).textContent = "Winner!";
        
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        // Hide dice
        diceDOM[0].style.display = 'none';
        diceDOM[1].style.display = 'none';

        isFinished = true;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

