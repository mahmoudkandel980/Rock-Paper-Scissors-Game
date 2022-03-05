const choices = document.querySelectorAll('.choice'),
    score = document.getElementById('score'),
    result = document.getElementById('result'),
    restart = document.getElementById('restart'),
    modal = document.querySelector('.modal'),
    modalIcon = document.getElementById('modal-icon'),
    startModal = document.querySelector('.startmodal'),
    input = document.querySelector('.startmodal input'),
    startModalBtn = document.getElementById('btn'),
    finalModal = document.querySelector('.finalmodal'),
    finalResult = document.getElementById('finalresult'),
    playAgine = document.querySelector('.play-btn'),
    scoreboard = {
        player: 0,
        computer: 0
    };
let array = ['rock', 'paper', 'scissors'];
let inputValue;

choices.forEach(choice => choice.addEventListener('click', play))
choices.forEach(choice => choice.addEventListener('click', hideModalPro))
window.addEventListener('DOMContentLoaded', loading)
restart.addEventListener('click', clearLocalstorage)
startModalBtn.addEventListener('click', hideStartModal)

modal.addEventListener('click', hideModal)

function play(e) {
    restart.style.display = 'inline-block';
    let playerChoise = e.target.id;
    let computerChoice = array[Math.floor(Math.random() * array.length)];
    let winner = getWinner(playerChoise, computerChoice)
    result.firstElementChild.textContent = winner;
    modalIcon.classList = `fas fa-hand-${computerChoice} fa-10x`;
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
    }, 2000);
}

function loading() {
    if (localStorage.getItem('player')) {
        scoreboard.player = JSON.parse(localStorage.getItem('player'));
        restart.style.display = 'inline-block';
    } else {
        scoreboard.player = 0
    }
    if (localStorage.getItem('computer')) {
        scoreboard.computer = JSON.parse(localStorage.getItem('computer'));
        restart.style.display = 'inline-block';
    } else {
        startModal.style.display = 'block';
        scoreboard.computer = 0
    }
    score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
    score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
    // finalModal.style.display = 'none'
}

//clear LocalStorage
function clearLocalstorage() {
    localStorage.removeItem('player');
    localStorage.removeItem('computer');
    scoreboard.player = 0
    scoreboard.computer = 0
    score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
    score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
    startModal.style.display = 'block';
}

function hideStartModal() {
    if (input.value >= 5) {
        inputValue = input.value;
        startModal.style.display = 'none';
    }
}

function check() {
    if (scoreboard.player >= input.value && input.value != 0 && input.value > 0) {
        finalModal.style.display = 'block';
        scoreboard.player = 0
        scoreboard.computer = 0
        score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
        score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
        localStorage.removeItem('player');
        localStorage.removeItem('computer');
        finalResult.firstElementChild.innerHTML = `You Win <span><i class="fa-solid fa-face-smile"></i></span>`;
        finalResult.firstElementChild.style.color = 'green'
        input.value = '10'
    } else if (scoreboard.computer >= input.value && input.value != 0 && input.value > 0) {
        finalModal.style.display = 'block';
        scoreboard.player = 0
        scoreboard.computer = 0
        score.firstElementChild.innerHTML = `Player: ${scoreboard.player}`;
        score.lastElementChild.innerHTML = `Computer: ${scoreboard.computer}`;
        localStorage.removeItem('player');
        localStorage.removeItem('computer');
        finalResult.firstElementChild.innerHTML = `You Lose <span><i class="fa-solid fa-face-smile"></i></span>`;
        finalResult.firstElementChild.style.color = 'red'
        input.value = '10'
    }

    if (finalModal.style.display == 'block') {
        playAgine.addEventListener('click', () => {
            finalModal.style.display = 'none';
            setTimeout(() => {
                startModal.style.display = 'block'
            }, 100)
        })
    }
    setTimeout(() => {
        check()
    }, 50);
}
check()
