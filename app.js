// Card configuration
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

// DOM elements
const cardContainer = document.querySelector('.card-container');
const cardFront = document.querySelector('.card-face.front img');
const cardBack = document.querySelector('.card-face.back img');
const nextButton = document.querySelector('.control-button.next');
const previousButton = document.querySelector('.control-button.previous');
const playButton = document.querySelector('.control-button.play');
const controlButtons = document.querySelectorAll('.control-button img');
const textContent = document.querySelector('.text-content');
const sliderProgress = document.querySelector('.slider-progress');
const sliderHandle = document.querySelector('.slider-handle');
const sliderBar = document.querySelector('.slider-bar');
const minimizeIcon = document.querySelector('.minimize-icon');

// State variables
let isCardFlipped = false;
let isAnimating = false;
let currentCard = { suit: 'diamonds', number: '2' };

// Function to update colors based on suit
function updateColors(suit) {
    const isRed = suit === 'hearts' || suit === 'diamonds';
    const color = isRed ? '#ff0000' : '#000000';
    
    textContent.style.color = color;
    sliderBar.style.backgroundColor = `${color}33`;
    sliderProgress.style.backgroundColor = color;
    sliderHandle.style.backgroundColor = color;
    
    controlButtons.forEach(button => {
        if (isRed) {
            button.style.filter = 'brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(5699%) hue-rotate(0deg) brightness(100%) contrast(118%)';
        } else {
            button.style.filter = 'brightness(0)';
        }
    });

    minimizeIcon.style.backgroundColor = color;
    
    const closeIconBefore = document.createElement('style');
    closeIconBefore.textContent = `
        .close-icon::before,
        .close-icon::after {
            background-color: ${color} !important;
        }
    `;
    document.head.appendChild(closeIconBefore);
}

// Function to get random card
function getRandomCard() {
    const suitIndex = Math.floor(Math.random() * suits.length);
    const numberIndex = Math.floor(Math.random() * numbers.length);
    return {
        suit: suits[suitIndex],
        number: numbers[numberIndex]
    };
}

// Function to update card
function updateCard(newCard) {
    currentCard = newCard;
    const cardPath = `svgs/cards/${newCard.suit}_${newCard.number}.svg`;
    cardFront.src = cardPath;
    updateColors(newCard.suit);
}

// Next button click handler
nextButton.addEventListener('click', () => {
    if (isAnimating || isCardFlipped) return;
    isAnimating = true;
    
    const frontFace = document.querySelector('.card-face.front');
    frontFace.classList.add('next-animation');
    
    setTimeout(() => {
        const newCard = getRandomCard();
        updateCard(newCard);
    }, 300);
    
    setTimeout(() => {
        frontFace.classList.remove('next-animation');
        isAnimating = false;
    }, 600);
});

// Previous button click handler
previousButton.addEventListener('click', () => {
    if (isAnimating || isCardFlipped) return;
    isAnimating = true;
    
    const frontFace = document.querySelector('.card-face.front');
    frontFace.classList.add('prev-animation');
    
    setTimeout(() => {
        const newCard = getRandomCard();
        updateCard(newCard);
    }, 300);
    
    setTimeout(() => {
        frontFace.classList.remove('prev-animation');
        isAnimating = false;
    }, 600);
});

// Play button click handler
playButton.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    cardContainer.classList.toggle('flipped');
    isCardFlipped = !isCardFlipped;
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
});

// Initialize with current card
const initialSuit = cardFront.src.split('/').pop().split('_')[0];
updateColors(initialSuit);

// Add window control functionality
document.querySelector('.window-button.close').addEventListener('click', () => {
    window.close();
});

document.querySelector('.window-button.minimize').addEventListener('click', () => {
    // Minimize window functionality would go here
});
