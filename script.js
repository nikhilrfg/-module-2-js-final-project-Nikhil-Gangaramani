let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();
// note the switch toUpperCase(), we want to always work in upper case letters to avoid confusing 'a' and 'A' as unequal.

let revealedLetters = new Array(word.length);
// creates an array with as many elements as word has characters. Each index of revealedLetters will correspond to a character in word, and if revealedLetters[n] is truthy, then word[n] has been correctly guessed.
revealedLetters.fill(false);

const maxStrikes = 6; // the number of incorrect guesses made so far
let strikes = 0;

let strikeLetters = new Array(maxStrikes);  // this will contain every letter that has been incorrectly guessed.

// Initialize DOM elements
const gallowsImage = document.getElementById('gallows-image');
const strikesSection = document.getElementById('strikes');
const wordSection = document.getElementById('word');
const guessForm = document.getElementById('guess-form');

// Draw initial state
drawGallows(); // Manipulates the DOM to update the image of the gallows for the current game state.

drawStrikeLetters();  // should create a String from strikeLetters and put that into the content of some element.
drawWordProgress(); // run this now, to draw the empty word at the start of the game.

// Event listener for form submission
guessForm.addEventListener('submit', function (event) {
    event.preventDefault();
    processGuess();
});

// should update an <img> element in the appropriate hangman.html section to point to "images/strike-"+strikes+".png"
function drawGallows() {
    gallowsImage.src = `images/strike-${strikes}.png`;
}

function drawStrikeLetters() {
    strikesSection.textContent = `Incorrect guesses: ${strikeLetters.join(', ')}`;
}

// should iterate over revealedLetters, and if the value at each index is truthy, print the corresponding letter from word. Otherwise, it should print a -.
function drawWordProgress() {
    wordSection.textContent = revealedLetters.map((revealed, index) => revealed ? word[index] : '-').join(' ');
}

function processGuess() {
    let guess = document.getElementById('guess-input').value.toUpperCase();

    // Look at each letter of our word, one letter at a time, and compare it to our guess
    if (strikes < maxStrikes) {
        if (word.includes(guess)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    revealedLetters[i] = true;
                }
            }
            drawWordProgress();
            if (revealedLetters.every(revealed => revealed)) {
                alert("Congratulations! You guessed the word!");
                resetGame();
            }
        } else {
            strikes++;
            strikeLetters[strikes - 1] = guess;
            drawGallows();
            drawStrikeLetters();
        }

        if (strikes === maxStrikes) {
            alert(`Game Over! The word was: ${word}`);
            resetGame();
        }
    } else {
        alert("The game is over!");
        resetGame();
    }

    document.getElementById('guess-input').value = '';
}

function resetGame() {
    word = prompt("Player 1, enter a new word for Player 2 to guess:").toUpperCase();
    revealedLetters.fill(false);
    strikes = 0;
    strikeLetters = new Array(maxStrikes);
    drawGallows();
    drawStrikeLetters();
    drawWordProgress();
}