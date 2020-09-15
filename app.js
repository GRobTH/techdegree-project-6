const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const overlay = document.getElementById('overlay');
const startGameBtn = overlay.querySelector('a');
const message = document.getElementById('message');
const ul = phrase.querySelector('ul');
const ol = scoreboard.querySelector('ol');
let missed = 0;

const phrases = [
    "Tell me something good",
    "Beat around the bush",
    "Better late than never",
    "Break a leg",
    "The best of both worlds"
];

function getRandomPhraseAsArray(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    let currentPhrase = phrases[rand].toLowerCase();
    currentPhrase = currentPhrase.split("");
    return currentPhrase;
}

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        if(arr[i].trim().length) {
            li.textContent = arr[i];
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        ul.appendChild(li);
    }
}

function animateButton(theLetter) {
    theLetter.style.transform = 'rotateZ(-15deg) scale(1.3)';
    theLetter.style.transition = 'transform .5s';
    setTimeout(function () {
        theLetter.style.transform = 'rotateZ(0deg)';
        theLetter.style.transition = 'transform .5s';
    }, 500);
}

function checkLetter(button) {
    const checkLetter = ul.children;
    let matchFound = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if(button.textContent === checkLetter[i].textContent) {
            theLetter = checkLetter[i];
            theLetter.className = 'show';
            matchFound = button;
            animateButton(theLetter);
        } 
    }
    return matchFound;
}

function checkWin() {
    let unguessed = 0;
    const li = ul.children;
    for(let i = 0; i < li.length; i++) {
        let liClassName = li[i].className;
        if (liClassName === 'letter') {
            unguessed++;
        }
    }
    if (unguessed === 0) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        startGameBtn.textContent = "Try Again";
        message.textContent = "You Win!";
        clearAll();
    } else if (missed >= 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        startGameBtn.textContent = "Try Again";
        message.textContent = "You Lose!";
        clearAll();
    }
}

function clearAll() {
    phraseArray = '';
    ul.textContent = '';
    missed = 0;
    ol.textContent = '';
    resetHearts();
    resetLetters();
}

function removeHeart() {
    let hearts = ol.children;
    let li = ol.firstElementChild;
    ol.removeChild(li);
    let newLI = document.createElement('li');
    newLI.className = 'tries';
    const newImg = document.createElement('img');
    newImg.src = 'images/lostHeart.png';
    newImg.height = '35';
    newImg.width = '30';
    newLI.appendChild(newImg);
    ol.appendChild(newLI);
}

function resetHearts() {
    for(let i = 0; i < 5; i++) {
        let newLI = document.createElement('li');
        newLI.className = 'tries';
        const newImg = document.createElement('img');
        newImg.src = 'images/liveHeart.png';
        newImg.height = '35';
        newImg.width = '30';
        newLI.appendChild(newImg);
        ol.appendChild(newLI);
    }
}

function resetLetters() {
    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('class');
        buttons[i].removeAttribute('disabled');
    }
}

qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        const button = e.target;
        button.className = 'chosen';
        button.setAttribute('disabled', 'true');
        const letterFound = checkLetter(button);
        if(!letterFound) {
            missed++;
            removeHeart();
        }
        checkWin();
    }
});

startGameBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

