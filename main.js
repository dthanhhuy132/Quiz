import { arrCompare } from "./compareArr.js";
import myQuestions from "./my-question.js";



const questionNumberEl = document.querySelector('.question-number');
const questionEl = document.querySelector('.question');
const answerEls = document.querySelectorAll('.answer');
const multiAnswerEl = document.querySelector('.multi-answer');

const a_textEl = document.getElementById('a_text');
const b_textEl = document.getElementById('b_text');
const c_textEl = document.getElementById('c_text');
const d_textEl = document.getElementById('d_text');

const preBtnEl = document.querySelector('.pre-btn');
const nextBtnEl = document.querySelector('.next-btn');
const submitBtnEl = document.querySelector('.submit-btn');

const passEl = document.querySelector('.pass');
const failEl = document.querySelector('.fail');
const scoreEl = document.querySelector('.score');

const currQuestionEl = document.querySelector('.current-question');

const reviewCorrectEl = document.querySelector('.review-correct');
const reviewIncorrectEl = document.querySelector('.review-incorrect');


let currentQuiz = 0;
const answerArr = [];
let isSubmited = false;
const CORRECT_ANSWER_ARR = 'CORRECT_ANSWER_ARR';



renderQuiz(currentQuiz)

function renderQuiz(currentQuiz) {
  const currentQuizData = myQuestions[currentQuiz];


  if (currentQuizData.multi) {
    answerEls.forEach(answerEl => answerEl.type = 'checkbox');
    multiAnswerEl.style.display = 'block';
  } else {
    answerEls.forEach(answerEl => answerEl.type = 'radio');
    multiAnswerEl.style.display = 'none';
  }


  questionNumberEl.innerText = `Question ${currentQuiz + 1}: `;
  questionEl.innerText = currentQuizData.question;
  a_textEl.innerText = currentQuizData.answers.a;
  b_textEl.innerText = currentQuizData.answers.b;
  c_textEl.innerText = currentQuizData.answers.c;
  d_textEl.innerText = currentQuizData.answers.d;

  currQuestionEl.innerHTML = `${currentQuiz + 1} out of ${myQuestions.length}`;

  deselecAnswer();
  checkBtn(currentQuiz);
  renderReviewAnswer(currentQuiz);
  if (isSubmited) checkAnswerAfterSummit()

}

function deselecAnswer() {
  answerEls.forEach(answerEl => {
    answerEl.checked = false;
  })
}

function addAnswer() {
  let answerTemp = []

  answerEls.forEach(answerEl => {
    if (answerEl.checked) answerTemp.push(answerEl.id)
  })

  // let preAnswer = getAnswer();
  answerArr.push(answerTemp);
}

function renderReviewAnswer(currentQuiz) {
  const reviewAnswers = answerArr[currentQuiz];
  if (reviewAnswers?.length > 0) {
    reviewAnswers.forEach(reviewAnswer => {
      answerEls.forEach(answerEl => {
        if (answerEl.id === reviewAnswer) answerEl.checked = true;
      })
    })
  }
}

preBtnEl.addEventListener('click', () => {
  console.log('currentQuiz trong pre', currentQuiz);
  addAnswer();
  currentQuiz -= 1
  renderQuiz(currentQuiz);
})

nextBtnEl.addEventListener('click', () => {
  addAnswer();
  currentQuiz += 1;
  renderQuiz(currentQuiz)

})

function checkBtn(currentQuiz) {
  currentQuiz == 0
    ? preBtnEl.setAttribute("disabled", "")
    : preBtnEl.removeAttribute("disabled", "")

  currentQuiz == myQuestions.length - 1
    ? nextBtnEl.setAttribute("hidden", "")
    : nextBtnEl.removeAttribute("hidden", "")

  currentQuiz == myQuestions.length - 1
    ? submitBtnEl.removeAttribute("hidden", "")
    : submitBtnEl.setAttribute("hidden", "")
}

submitBtnEl.addEventListener('click', () => {
  const text = `Are you sure to submit your answers?
  OK: I am very sure
  Cancel: Let's me review again!!
  `

  if (confirm(text)) {
    addAnswer();
    isSubmited = true;
    let corretAnswerReply = markTheQuiz();
    localStorage.setItem(CORRECT_ANSWER_ARR, JSON.stringify(corretAnswerReply))

    checkAnswerAfterSummit(corretAnswerReply);
    submitBtnEl.setAttribute('disabled', "");
    // answerEls.forEach(answerEl => answerEl.setAttribute('disabled', ""));
  }
})


function markTheQuiz() {
  let score = 0;
  let correctAnswerReply = [];


  myQuestions.forEach((question, index) => {
    if (question.multi) {
      let compareArr = arrCompare(question.correctAnswer, answerArr[index]);
      if (compareArr) {
        score += 1;
        correctAnswerReply.push(index);
      };
    }

    if (question.correctAnswer === answerArr[index].join('')) {
      score += 1;
      correctAnswerReply.push(index);
    };

  })
  const scorePercent = score / myQuestions.length * 100

  scoreEl.innerText = `Your score: ${scorePercent.toFixed(0)}`

  if (score >= myQuestions.length / 2) {
    passEl.removeAttribute('hidden');
  }

  if (score < myQuestions.length / 2) {
    failEl.removeAttribute('hidden');
  }

  return correctAnswerReply;
}



function checkAnswerAfterSummit() {
  const corretAnswerReply = JSON.stringify(localStorage.getItem(CORRECT_ANSWER_ARR))

  if (corretAnswerReply.indexOf(currentQuiz) > -1) {
    reviewCorrectEl.style.display = 'block';
    reviewIncorrectEl.style.display = 'none';
  } else {
    reviewIncorrectEl.style.display = 'block';
    reviewCorrectEl.style.display = 'none';
  }

}
