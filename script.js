const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; /* trancar tabuleiro */
let isTimerStarted = false; // variável para verificar se o timer já começou
let matchedCards = 0; // variável para contar as cartas combinadas
const totalPairs = cards.length / 2; // total de pares de cartas
const resetButton = document.getElementById('resetButton'); // referência ao botão de reset

//Função para virar carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!isTimerStarted) {
        startTimer(); // inicia o timer na primeira virada de carta
        isTimerStarted = true; // marca que o timer foi iniciado
    }

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//Função que checa se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    unflipCards();
}

//Função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedCards++;
    if (matchedCards === totalPairs) {
        stopTimer(); // para o timer quando todas as cartas forem combinadas
        resetButton.style.display = 'block'; // mostra o botão de reset
    }

    resetBoard();
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    document.getElementById('timer').textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    });
}

function resetGame() {
    // Reseta todas as variáveis
    [hasFlippedCard, lockBoard, isTimerStarted] = [false, false, false];
    [firstCard, secondCard] = [null, null];
    matchedCards = 0;

    // Reseta o tabuleiro
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    shuffle();
    document.getElementById('timer').textContent = '00:00'; // Reseta o cronômetro
    resetButton.style.display = 'none'; // Esconde o botão de reset
}

resetButton.addEventListener('click', resetGame); // Adiciona evento de clique ao botão de reset

shuffle();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

//Funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//Função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
