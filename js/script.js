const questionsList = [
  {
    question: "What is the output of this code?\nconsole.log([] + []);",
    options: {
      A: "'0'",
      B: "'[]'",
      C: "'' (empty string)",
      D: "'[object Object][object Object]'",
    },
    answer: "C",
  },
  {
    question: "Which of the following is true about closures in JavaScript?",
    options: {
      A: "A closure is a function that has access to its own scope only.",
      B: "A closure can access variables from its parent function even after the parent has returned.",
      C: "Closures cannot access global variables.",
      D: "Closures are only created using arrow functions.",
    },
    answer: "B",
  },
  {
    question: "What will this return?\ntypeof NaN === typeof null",
    options: {
      A: "true",
      B: "false",
      C: "undefined",
      D: "Throws an error",
    },
    answer: "A",
  },
  {
    question: "Which of these statements is correct regarding 'use strict'?",
    options: {
      A: "It enables ES6 features in all browsers.",
      B: "It allows usage of undeclared variables.",
      C: "It prevents assigning values to read-only properties.",
      D: "It disables function hoisting.",
    },
    answer: "C",
  },
  {
    question: "What is the result of this expression?\n[1, 2, 3] == [1, 2, 3]",
    options: {
      A: "true",
      B: "false",
      C: "undefined",
      D: "Syntax Error",
    },
    answer: "B",
  },
];

let currentIndex = 0;
let finalScore = 0;
let timerInterval;
let timeRemaining = 20;

const questionElement = document.getElementById("question");
const optionElements = document.querySelectorAll(".option");
const timerElement = document.getElementById("timer");
const timerBox = document.getElementById("timerBox");
const progressElement = document.getElementById("progress");
const resultSection = document.getElementById("result");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const remarkElement = document.getElementById("remark");

function beginTimer() {
  clearInterval(timerInterval);
  timeRemaining = 20;
  timerElement.textContent = timeRemaining;
  updateTimerStyle();

  timerInterval = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    updateTimerStyle();

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      goToNext();
    }
  }, 1000);
}

function updateTimerStyle() {
  if (timeRemaining > 5) {
    timerElement.style.backgroundColor = "#2ecc71"; // green
  } else {
    timerElement.style.backgroundColor = "#e74c3c"; // red
  }
}

function showQuestion() {
  const currentQ = questionsList[currentIndex];
  questionElement.textContent = currentQ.question;
  optionElements.forEach((opt) => {
    opt.textContent = `${opt.dataset.option}) ${
      currentQ.options[opt.dataset.option]
    }`;
    opt.className = "option";
  });
  progressElement.textContent = `${currentIndex + 1} of ${
    questionsList.length
  } Questions`;
  beginTimer();
}

optionElements.forEach((opt) => {
  opt.addEventListener("click", () => {
    optionElements.forEach((el) => el.classList.remove("selected"));
    opt.classList.add("selected");
  });
});

function goToNext() {
  clearInterval(timerInterval);

  const selected = document.querySelector(".option.selected");
  if (selected) {
    const selectedOption = selected.dataset.option;
    const correctOption = questionsList[currentIndex].answer;

    if (selectedOption === correctOption) {
      finalScore++;
      selected.classList.add("correct");
    } else {
      selected.classList.add("wrong");
      document
        .querySelector(`.option[data-option='${correctOption}']`)
        .classList.add("correct");
    }
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questionsList.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 1000);
}

function goToPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

function finishQuiz() {
  document.querySelector("main").classList.add("hidden");
  document.querySelector("footer").classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreElement.textContent = finalScore;
  totalElement.textContent = questionsList.length;
  timerBox.remove();

  if (finalScore === questionsList.length) {
    remarkElement.textContent = "🎉 Congratulations! You got everything right!";
  } else if (finalScore <= 1) {
    remarkElement.textContent = "😢 Poor, better luck next time.";
  } else {
    remarkElement.textContent = "";
  }
}

function restartQuiz() {
  currentIndex = 0;
  finalScore = 0;
  resultSection.classList.add("hidden");
  document.querySelector("main").classList.remove("hidden");
  document.querySelector("footer").classList.remove("hidden");
  document.querySelector("header").appendChild(timerBox);
  showQuestion();
}

document.getElementById("nextBtn").addEventListener("click", goToNext);
document.getElementById("previousBtn").addEventListener("click", goToPrevious);
document.getElementById("restartBtn").addEventListener("click", restartQuiz);

showQuestion();
