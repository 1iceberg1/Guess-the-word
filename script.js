const inputs = document.querySelector(".input"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuess, correct=[], incorrect=[];

function randomWord() {
    // getting random object from wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; // getting word of random object
    maxGuess = 8; correct=[]; incorrect=[];

    guessLeft.innerText = maxGuess;
    hint.innerText = ranObj.hint;
    wrongLetter.innerText = incorrect;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(key)) {
        if(word.includes(key)) { // if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                // showing match letter in the input value
                if(word[i] === key) {
                    correct.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuess--; // decrement maxGuess by 1
            incorrect.push(` ${key}`);
        }
        guessLeft.innerText = maxGuess;
        wrongLetter.innerText = incorrect;
    }
    typingInput.value = "";


    setTimeout(() => {
        if (correct.length === word.length) { // if user found all correct letters
            alert(`Congrate! You found the word ${word.toUpperCase()}`);
            randomWord(); // calling random func, so the game reset
        } else if(maxGuess < 1) { // if users couldn't find all letters
            alert("Game Over! You don't have remaining guesses.")
            for (let i = 0; i < word.length; i++) {
                // show all letters in the input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());