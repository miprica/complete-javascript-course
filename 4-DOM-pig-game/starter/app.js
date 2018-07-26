/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, isFinished, activePlayer;
var currentScoresDOM, globalScoresDOM, diceDOM;

init();

function init () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isFinished = false;

    
    currentScoresDOM = [document.getElementById('current-0'), document.getElementById('current-1')];
    globalScoresDOM = [document.getElementById('score-0'), document.getElementById('score-1')];

    // Reset scores
    currentScoresDOM[0].textContent = 0;
    currentScoresDOM[1].textContent = 0;
    globalScoresDOM[0].textContent = 0;
    globalScoresDOM[1].textContent = 0;

    // Hide dice
    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'none';

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
    var dice = Math.floor(Math.random() * 6) + 1;
    
    // Display dice
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM.style.display = 'block';

    if (dice !== 1) {
        // Update round score
        roundScore += dice;

        // Update current scores
        currentScoresDOM[activePlayer].textContent = roundScore;
    } else {
        nextPlayer();
    }
});

function nextPlayer() {
    roundScore = 0;

    // Reset players score
    currentScoresDOM[activePlayer].textContent = 0;

    // Switch formattings
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // Hide dice
    diceDOM.style.display = 'none';

    activePlayer = activePlayer == 0 ? 1 : 0;
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isFinished) {
        return;
    }
    scores[activePlayer] += roundScore;
    // Update score
    globalScoresDOM[activePlayer].textContent = scores[activePlayer];

    // Check if winner
    if (scores[activePlayer] >= 20) {
        // Apply winner formatting
        document.getElementById('name-' + activePlayer).textContent = "Winner!";
        
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        // Hide dice
        diceDOM.style.display = 'none';

        isFinished = true;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

