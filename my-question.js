const myQuestions = [
  {
    question: 'Which is correct?',
    answers: {
      a: "typeof null = object",
      b: 'typeof null = null',
      c: 'typeof function = function',
      d: 'typeof function = undefined'
    },
    multi: true,
    correctAnswer: ['a', 'c']
  },

  {
    question: 'Javascript is _________ language.',
    answers: {
      a: 'Programming',
      b: 'Application',
      c: 'None of These',
      d: 'Scripting'
    },
    multi: false,
    correctAnswer: ['d']
  },
  {
    question:
      'Which of the following is a valid type of function javascript supports?',
    answers: {
      a: 'named function',
      b: 'anonymous function',
      c: 'both of the above',
      d: 'none of the above'
    },
    multi: false,
    correctAnswer: 'c'
  },
  {
    question:
      'Which is object methods?',
    answers: {
      a: 'forEach()',
      b: 'entries()',
      c: 'indexOf()',
      d: 'keys()'
    },
    multi: true,
    correctAnswer: ['b', 'd']
  },
  {
    question: 'Which one of the following is valid data type of JavaScript',
    answers: {
      a: 'number',
      b: 'void',
      c: 'boolean',
      d: 'nothing'
    },
    multi: false,
    correctAnswer: 'c'
  }
];



export default myQuestions