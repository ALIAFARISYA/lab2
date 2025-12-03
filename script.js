// Quiz questions array
const questions = [
    {
        question: "Why does Ming Yi disguise herself as a man at the beginning of the story?",
        options: [
            "To escape from the palace",
            "To participate in a tournament only open to men",
            "To spy on Ji Bozai",
            "To hide from her family"
        ],
        answer: 1
    },
    {
        question: "What is Ming Yi’s main mission after losing the Qingyun Tournament?",
        options: [
            "To become a dancer",
            "To find her missing brother",
            "To search for the antidote to her poison",
            "To travel to another kingdom"
        ],
        answer: 2
    },
    {
        question: "Why does Ming Yi start working close to Ji Bozai?",
        options: [
            "He might have the antidote she needs",
            "He offers her protection",
            "He recognizes her real identity",
            "She wants revenge on him"
        ],
        answer: 0
    },
    {
        question: "What makes Ming Yi’s mission more complicated?",
        options: [
            "Ji Bozai already knows her true identity",
            "She begins developing feelings for Ji Bozai",
            "She refuses to use martial arts",
            "She loses all her memories"
        ],
        answer: 1
    },
    {
        question: "What theme is strongly shown throughout Love in the Clouds?",
        options: [
            "Technology and future inventions",
            "Time travel and destiny",
            "Identity, sacrifice, and complicated love",
            "Comedy and school life"
        ],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let selectedOption = null;
let shuffledQuestions = [];

// DOM Elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const timeElement = document.getElementById('time');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const finalScoreElement = document.getElementById('final-score');
const totalQuestionsElement = document.getElementById('total-questions');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');

// Initialize the quiz
function startQuiz() {
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    selectedOption = null;
    
    // Shuffle questions
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    
    // Show quiz container, hide score container
    quizContainer.style.display = 'block';
    scoreContainer.style.display = 'none';
    
    // Display first question
    displayQuestion();
    
    // Start timer
    startTimer();
}

// Display current question
function displayQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    // Update question text
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new option buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.dataset.index = index;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    // Reset selected option
    selectedOption = null;
    
    // Update button visibility
    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    
    // Hide feedback
    feedbackElement.style.display = 'none';
}

// Select an option
function selectOption(index) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    options[index].classList.add('selected');
    selectedOption = index;
}

// Check the selected answer
function checkAnswer() {
    if (selectedOption === null) {
        alert('Please select an answer!');
        return;
    }
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    
    // Show feedback
    feedbackElement.textContent = isCorrect ? 'Correct! 🎉' : 'Incorrect! 😞';
    feedbackElement.className = isCorrect ? 'correct' : 'incorrect';
    feedbackElement.style.display = 'block';
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Update button visibility
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    
    // Disable options after answer
   const options = document.querySelectorAll('.option');
options.forEach(option => {
    option.disabled = true;
    if (parseInt(option.dataset.index) === currentQuestion.answer) {
        option.classList.add('correct-answer');
    }
});

}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Start the timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timeElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// End the quiz
function endQuiz() {
    clearInterval(timer);
    
    // Update score display
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = shuffledQuestions.length;
    
    // Show score container, hide quiz container
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
}

// Start the quiz when page loads
window.onload = startQuiz;