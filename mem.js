document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    const images = [
        "apple.png","apple.png","banana.png","banana.png",
        "carrot.png","carrot.png","guava.png","guava.png",
        "cherry.png","cherry.png","mango.png","mango.png",
        "orange.png","orange.png","papaya.png","papaya.png"  ];


    let score = 0;
    let matchedPairs = 0;
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let timer = 0;
    let intervalId;

 
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledImages = shuffle(images);

 
    function renderBoard() {
        shuffledImages.forEach((imageSrc) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.image = imageSrc;

            const img = document.createElement("img");
            img.src = `images/${imageSrc}`; 
            card.appendChild(img);
            gameBoard.appendChild(card);
            card.addEventListener("click", flipCard);
            
        });
    }
 renderBoard();

    function startTimer() {
        intervalId = setInterval(() => {
            timer++;
            displayTime();
        }, 1000);
    }

   
    function stopTimer() {
        clearInterval(intervalId);
    }

   
    function displayTime() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerDisplay.textContent =  `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

 
    function flipCard() {
        if (lockBoard) return;
        if (this == firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            if (timer == 0) startTimer();         } else {
            secondCard = this;
            checkForMatch();
        }
    }


    function checkForMatch() {
        if (firstCard.dataset.image == secondCard.dataset.image) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            matchedPairs++;
           updateScore();
            resetTurn();
            if (matchedPairs == images.length / 2) {
                stopTimer();
document.getElementById("result").innerHTML=`Congratulations! You completed the game in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}${timer<=60?" seconds":" minutes"} with a score of ${score}.`
                           }
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetTurn();
            }, 1000);
        }
    }

    
    function updateScore() {
        score++;
        scoreDisplay.textContent = score;
    }

   
    function resetTurn() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

   
});
