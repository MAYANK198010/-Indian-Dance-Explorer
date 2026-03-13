let quizData = [];
let unlockedLevel = 0;
let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let currentScore = 0;
let answeringLocked = false;

const levelGrid = document.getElementById("levelGrid");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");
const certificatePanel = document.getElementById("certificatePanel");

function loadQuizData() {
  if (!Array.isArray(window.QUIZ_DATA)) {
    throw new Error("Quiz data could not be loaded.");
  }

  return window.QUIZ_DATA.map((level) => ({
    ...level,
    questions: level.questions.map((question) => ({ ...question }))
  }));
}

function shuffleQuestionOptions(question) {
  const optionPairs = question.options.map((option, index) => ({
    option,
    isCorrect: index === question.answer
  }));

  for (let index = optionPairs.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [optionPairs[index], optionPairs[swapIndex]] = [optionPairs[swapIndex], optionPairs[index]];
  }

  question.options = optionPairs.map((entry) => entry.option);
  question.answer = optionPairs.findIndex((entry) => entry.isCorrect);
}

function prepareLevelQuestions(levelIndex) {
  quizData[levelIndex].questions.forEach((question) => {
    shuffleQuestionOptions(question);
  });
}

function renderLevelCards() {
  levelGrid.innerHTML = "";

  quizData.forEach((level, index) => {
    const isUnlocked = index <= unlockedLevel;
    const card = document.createElement("article");
    card.className = `level-card${isUnlocked ? "" : " locked"}`;
    card.innerHTML = `
      <p class="section-kicker">${level.id}</p>
      <h3>${level.title}</h3>
      <p>${level.description}</p>
      <p class="quiz-status">${level.questions.length} questions</p>
      <button type="button" ${isUnlocked ? "" : "disabled"}>${isUnlocked ? "Start level" : "Locked"}</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      if (isUnlocked) {
        startLevel(index);
      }
    });

    levelGrid.appendChild(card);
  });
}

function startLevel(levelIndex) {
  currentLevelIndex = levelIndex;
  currentQuestionIndex = 0;
  currentScore = 0;
  answeringLocked = false;

  quizData = loadQuizData();
  prepareLevelQuestions(levelIndex);

  resultPanel.classList.add("hidden");
  certificatePanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  renderQuestion();
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuestion() {
  const level = quizData[currentLevelIndex];
  const question = level.questions[currentQuestionIndex];

  document.getElementById("quizLevelTitle").textContent = `${level.id}: ${level.title}`;
  document.getElementById("questionProgress").textContent = `Question ${currentQuestionIndex + 1} / ${level.questions.length}`;
  document.getElementById("questionScore").textContent = `Score ${currentScore}`;
  document.getElementById("questionText").textContent = question.question;
  document.getElementById("quizStatus").textContent = question.type === "boolean" ? "Choose True or False." : "Choose the correct answer.";

  const optionsWrap = document.getElementById("quizOptions");
  optionsWrap.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => submitAnswer(index, button));
    optionsWrap.appendChild(button);
  });
}

function submitAnswer(selectedIndex, selectedButton) {
  if (answeringLocked) {
    return;
  }

  answeringLocked = true;
  const level = quizData[currentLevelIndex];
  const question = level.questions[currentQuestionIndex];
  const buttons = Array.from(document.querySelectorAll(".quiz-option"));

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === question.answer) {
    currentScore += 1;
    document.getElementById("quizStatus").textContent = "Correct answer.";
  } else {
    selectedButton.classList.add("incorrect");
    document.getElementById("quizStatus").textContent = `Incorrect. The correct answer was \"${question.options[question.answer]}\".`;
  }

  document.getElementById("questionScore").textContent = `Score ${currentScore}`;

  window.setTimeout(() => {
    currentQuestionIndex += 1;
    answeringLocked = false;

    if (currentQuestionIndex < level.questions.length) {
      renderQuestion();
    } else {
      finishLevel();
    }
  }, 900);
}

function finishLevel() {
  quizPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");

  const level = quizData[currentLevelIndex];
  const total = level.questions.length;
  const passedFinalLevel = currentLevelIndex === 2 && currentScore >= 47;

  document.getElementById("resultTitle").textContent = `${level.id} complete`;
  document.getElementById("resultText").textContent = `You scored ${currentScore} out of ${total}.`;

  const retryButton = document.getElementById("retryLevel");
  const nextAction = document.getElementById("nextAction");

  retryButton.onclick = () => startLevel(currentLevelIndex);

  if (currentLevelIndex < quizData.length - 1) {
    unlockedLevel = Math.max(unlockedLevel, currentLevelIndex + 1);
    renderLevelCards();
    nextAction.textContent = "Open next level";
    nextAction.onclick = () => startLevel(currentLevelIndex + 1);
  } else if (passedFinalLevel) {
    nextAction.textContent = "View certificate";
    nextAction.onclick = showCertificate;
  } else {
    nextAction.textContent = "Back to levels";
    nextAction.onclick = () => {
      resultPanel.classList.add("hidden");
      renderLevelCards();
      levelGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.getElementById("resultText").textContent = `You scored ${currentScore} out of ${total}. Score 47 or more on Level 3 to unlock the certificate.`;
  }

  resultPanel.classList.toggle("pass", passedFinalLevel);
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showCertificate() {
  resultPanel.classList.add("hidden");
  certificatePanel.classList.remove("hidden");
  document.getElementById("certificateScore").textContent = `Final level score: ${currentScore} / 50`;
  certificatePanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("backToLevels").addEventListener("click", () => {
  quizPanel.classList.add("hidden");
  renderLevelCards();
  levelGrid.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("printCertificate").addEventListener("click", () => {
  window.print();
});

document.addEventListener("DOMContentLoaded", () => {
  try {
    quizData = loadQuizData();
    renderLevelCards();
  } catch (error) {
    levelGrid.innerHTML = `<article class="level-card"><h3>Quiz unavailable</h3><p>${error.message}</p></article>`;
  }
});
