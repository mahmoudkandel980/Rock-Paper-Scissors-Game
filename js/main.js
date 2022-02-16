const choices = document.querySelectorAll('.choice'),
    score = document.getElementById('score'),
    result = document.getElementById('result'),
    restart = document.getElementById('restart'),
    modal = document.querySelector('.modal'),
    scoreboard = {
        player: 0,
        computer: 0
    };
let array = ['rock', 'paper', 'scissors']

choices.forEach(choice => choice.addEventListener('click', play))
choices.forEach(choice => choice.addEventListener('click', hideModalPro))
window.addEventListener('DOMContentLoaded', loading)
restart.addEventListener('click', clearLocalstorage)

modal.addEventListener('click', hideModal)

function play(e) {
    restart.style.display = 'inline-block';
    let playerChoise = e.target.id;
    let computerChoice = array[Math.floor(Math.random() * array.length)];
    let winner = getWinner(playerChoise, computerChoice)
    result.firstElementChild.textContent = winner;
    result.lastElementChild.textContent = `Computer Chose ${computerChoice}`;

    if (winner == 'You Win') {
        result.firstElementChild.className = 'text-win';
        scoreboard.player++
        score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
        localStorage.setItem('player', scoreboard.player)
    } else if (winner == 'You Lose') {
        result.firstElementChild.className = 'text-lose'
        scoreboard.computer++
        score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
        localStorage.setItem('computer', scoreboard.computer)
    } else {
        result.firstElementChild.className = 'text-draw'
    }
}

function getWinner(player, computer) {
    if (player == computer) {
        modal.style.display = 'block';
        return 'draw';
    } else if (
        player == "rock" && computer == "scissors" ||
        player == "scissors" && computer == "paper" ||
        player == "paper" && computer == "rock"
    ) {
        modal.style.display = 'block';
        return 'You Win';
    } else if (
        computer == "rock" && player == "scissors" ||
        computer == "scissors" && player == "paper" ||
        computer == "paper" && player == "rock"
    ) {
        modal.style.display = 'block';
        return 'You Lose';
    }
}

function hideModal(e) {
    if (modal.style.display == 'block' && e.target.className == 'modal') {
        modal.style.display = 'none';
    }
}

function hideModalPro() {
    setTimeout(() => {
        if (modal.style.display == 'block') {
            modal.style.display = 'none';
        }
    }, 1000);
}

function loading() {
    if (localStorage.getItem('player')) {
        scoreboard.player = JSON.parse(localStorage.getItem('player'));
    } else {
        scoreboard.player = 0
    }
    if (localStorage.getItem('computer')) {
        scoreboard.computer = JSON.parse(localStorage.getItem('computer'));
    } else {
        scoreboard.computer = 0
    }

    score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
    score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
}

//clear LocalStorage
function clearLocalstorage() {
    localStorage.removeItem('player');
    localStorage.removeItem('computer');
    scoreboard.player = 0
    scoreboard.computer = 0
    score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
    score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
}