// global variables called in many different functions
let startButton = document.getElementById('start-button')
let nextButton = document.getElementById('next-button')
let gameArea = document.getElementById('game-area')
let scoreArea = document.getElementById('score-area')
let rulesButton = document.getElementById('rules-button')
let rulesDiv = document.getElementById('rules');
let logo = document.getElementById('logo-div');

let startFromRules = document.getElementById('start-from-rules');
let showScoreButton = document.getElementById('show-score-button');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');

let currentQuestionIndex;

// event listeners to trigger funtions when buttons clicked

startButton.addEventListener('click', runGame);
rulesButton.addEventListener('click', showRules);
startFromRules.addEventListener('click', runGame);
showScoreButton.addEventListener('click', () => {
    showScore()
    finishGame()
  });
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
    removeLastQuestion()
  });

// runs game when start button is clicked

function runGame() {
    console.log("started");
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    scoreArea.classList.remove('hide');
    rulesButton.classList.add('hide');
    showScoreButton.classList.add('hide');
    rulesDiv.classList.add('hide');
    logo.classList.remove('hide');
    currentQuestionIndex = 0
    nextQuestion();
    resetScore();
}

// finishes game after last question and returns user to home screen

function finishGame() {
    console.log("Game over");
    startButton.classList.remove('hide');
    gameArea.classList.add('hide');
    scoreArea.classList.add('hide');
    rulesButton.classList.remove('hide');
    showScoreButton.classList.add('hide');
    rulesDiv.classList.add('hide');
    currentQuestionIndex = 0
    clearStatusClass(document.body)
    resetScore();
}

// shows rules div when button is clicked

function showRules() {
    rulesDiv.classList.remove('hide');
    logo.classList.add('hide');
}

// shows next question and clears previous question answers

function nextQuestion() {
    resetQuiz()
    showQuestion(questions[Math.floor(Math.random() * questions.length)]);
}

// Shows questions in question area

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
      })
}

// gives answer when user clicks a button, increments correct or incorrect score

function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct
    let showScore = document.getElementById('show-score-button');
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
        if (currentQuestionIndex < 9) {
            nextButton.classList.remove('hide')
            } else {
            startButton.classList.add('hide')
             showScore.classList.remove('hide')

         }
            if (correct) {
                incrementScore();
            } else {
                incrementWrongAnswer();
         }

  }

//   show alert with different message depending on user score

function showScore() {
    let correctAnswerScore = document.getElementById('score').innerText;
    let incorrectAnswerScore = document.getElementById('incorrect').innerText;

    if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 100 && parseInt(correctAnswerScore) === 100) {
        alert(`Congratulations! Top of the league! You scored ${correctAnswerScore} points. You're a Premier Legaue Quiz Master!`);
    }

    else if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 100 && parseInt(correctAnswerScore) >= 70 && parseInt(correctAnswerScore) < 100) {
        alert(`Congratulations! You finished top 4! You scored ${correctAnswerScore} points. Keep practicing your Premier League skills and push for the title!`);
    }

    else if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 100 && parseInt(correctAnswerScore) < 70 && parseInt(correctAnswerScore) > 30) {
        alert(`Keep Trying! You finished mid table, but had a decent cup run. You scored ${correctAnswerScore} points. You need more hours on the training pitch!`);
    }

    else if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 100 && parseInt(correctAnswerScore) <= 30) {
        alert(`Relegation! You finished in the bottom 3 with only ${correctAnswerScore} points. You'll spend next season in the Championship!`);
    }
}

// change colour of buttons depending on answer WebGLActiveInfo. Red for wrong green for correct
  
function setStatusClass(element, Correct) {
    clearStatusClass(element)
    if (Correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
// Clear classes of colour when new question is loaded

  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

// reset answers after every question 

function resetQuiz() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      }
}

function removeLastQuestion(question) {
    currentIndex = questions[Math.floor(Math.random() * questions.length)]
    questions.splice(currentIndex, 1);
}

// reset the score when a new game is played

function resetScore() {
    if (runGame) {
        let oldScore = parseInt(document.getElementById('score').innerText);
        document.getElementById('score').innerText = 0;
        let oldWrongScore = parseInt(document.getElementById('incorrect').innerText);
        document.getElementById('incorrect').innerText = 0;
    }
}

// Increment correct and incorrect scores 

function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = oldScore += 10;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = oldScore += 10;
}

// question arrays

let questions = [{ 
    id: 0,
    question: "Which team holds the record for fewest wins in a Premier League season?",
    answers: [{ text: "Wigan Athlethic", correct: false },
        { text: "Sunderland", correct: false },
        { text: "Derby County", correct: true },
        { text: "Norwich City", correct: false }
    ]

},
{
    id: 1,
    question: "Which of these players has more Premier League appearances?",
    answers: [{ text: "Phil Neville", correct: true },
        { text: "Steven Gerrard", correct: false },
        { text: "Jamie Carragher", correct: false },
        { text: "Sol Campbell", correct: false }
    ]

},
{
    id: 2,
    question: "Which of these players has more Premier League assists?",
    answers: [{ text: "Alan Shearer", correct: false },
        { text: "Gareth Barry", correct: false },
        { text: "Christan Eriksen", correct: true },
        { text: "Ashley Young", correct: false }
    ]

},
{
    id: 3,
    question: "Which of these Premier League keepers has kept the most clean sheets?",
    answers: [{ text: "Pepe Reina", correct: false },
        { text: "Brad Friedel", correct: false },
        { text: "David De Gea", correct: true },
        { text: "Tim Howard", correct: false }
    ]

},
{
    id: 4,
    question: "Which of these players picked up the most yellow cards?",
    answers: [{ text: "Scott Parker", correct: true },
        { text: "Robbie Savage", correct: false },
        { text: "Lee Catermole", correct: false },
        { text: "Joey Barton", correct: false }
    ]

},
{
    id: 5,
    question: "Which of these clubs scored more own goals in the Premier League?",
    answers: [{ text: "Liverpool", correct: false },
        { text: "Chelsea", correct: false },
        { text: "Manchester United", correct: false },
        { text: "Arsenal", correct: true }
    ]

},
{
    id: 6,
    question: "Who finished top goal scorer in the 2003/2004 Premier League season",
    answers: [{ text: "Thierry Henry", correct: true },
        { text: "Alan Shearer", correct: false },
        { text: "Louis Saha", correct: false },
        { text: "Ruud Van Nistlerooy", correct: false }
    ]

},
{
    id: 7,
    question: "Who won the 2006/2007 Premier League goal of the season",
    answers: [{ text: "Cristiano Ronaldo", correct: false },
        { text: "Wayne Rooney", correct: true },
        { text: "Darren Bent", correct: false },
        { text: "Dimitar Berbatov", correct: false }
    ]

},
{
    id: 8,
    question: "Who won the PFA Player of the year in 2011/2012",
    answers: [{ text: "Wayne Rooney", correct: false },
        { text: "Gareth Bale", correct: false },
        { text: "Luis Suarez", correct: false },
        { text: "Robin Van Persie", correct: true }
    ]

},
{
    id: 9,
    question: "Which of these teams has more all time wins in the Premier League",
    answers: [{ text: "Everton", correct: true },
        { text: "Newcastle United", correct: false },
        { text: "Aston Villa", correct: false },
        { text: "West Ham United", correct: false }
    ]

},
{
    id: 10,
    question: "Who holds the record for most Premier League clubs managed? ",
    answers: [{ text: "Harry Rednapp", correct: false },
        { text: "Tony Pulis", correct: false },
        { text: "Sam Allardyce", correct: true },
        { text: "Steve Bruce", correct: false }
    ]

},
{
    id: 11,
    question: "Who holds the record for most Premier League goals in a calendar year?",
    answers: [{ text: "Mohamed Salah", correct: false },
        { text: "Alan Shearer", correct: false },
        { text: "Andy Cole", correct: false },
        { text: "Harry Kane", correct: true }
    ]

},
{
    id: 12,
    question: "Who holds the record for most Premier League Golden Boot awards?",
    answers: [{ text: "Alan Shearer", correct: false },
        { text: "Harry Kane", correct: false },
        { text: "Thierry Henry", correct: true },
        { text: "Michael Owen", correct: false }
    ]

},
{
    id: 13,
    question: "Who holds the record for most Premier League headed goals",
    answers: [{ text: "Harry Kane", correct: false },
        { text: "Didier Drogba", correct: false },
        { text: "Peter Crouch", correct: true },
        { text: "Romelu Lukaku", correct: false }
    ]

},
{
    id: 14,
    question: "Who holds the record for all time penalty saves in the Premier League",
    answers: [{ text: "Lukas Fabianski", correct: true },
        { text: "Joe Hart", correct: false },
        { text: "Hugo Lloris", correct: false },
        { text: "Shay Given", correct: false }
    ]

},
{
    id: 15,
    question: "Which of these players has hit the woodwork the most this season",
    answers: [{ text: "Joelinton", correct: false },
        { text: "Kai Havertz", correct: false },
        { text: "Son Heung-Min", correct: false },
        { text: "Darwin Nunez", correct: true }
    ]

},
{
    id: 16,
    question: "What is the current capacity of Old Trafford, home of Manchester United",
    answers: [{ text: "76,427", correct: false },
        { text: "81,752", correct: false },
        { text: "71,755", correct: false },
        { text: "74,310", correct: true }
    ]

},
{
    id: 17,
    question: "Who was the top scorer in the Premier League first ever season of 1992/93?",
    answers: [{ text: "Alan Shearer", correct: false },
        { text: "Teddy Sheringham", correct: true },
        { text: "Dean Holdsworth", correct: false },
        { text: "Les Ferdinand", correct: false }
    ]

},
{
    id: 18,
    question: "Which player won the PFA Player of the Year Award in the opening Premier League season of 92/93?",
    answers: [{ text: "Paul McGrath", correct: true },
        { text: "Gary Speed", correct: false },
        { text: "Paul Ince", correct: false },
        { text: "Chris Waddle", correct: false }
    ]

},
{
    id: 19,
    question: "Who scored the 20,000th Premier League goal in the 2011/12 season?",
    answers: [{ text: "Robin Van Persie", correct: false },
        { text: "Clint Dempsey", correct: false },
        { text: "Danny Graham", correct: false },
        { text: "Marc Albrighton", correct: true }
    ]

},
{
    id: 20,
    question: "Arsenal's last match at Highbury took place in 2005/06, but who was it against?",
    answers: [{ text: "Wigan Athletic", correct: true },
        { text: "Bolton Wanderers", correct: false },
        { text: "Blackburn Rovers", correct: false },
        { text: "Newcastle United", correct: false }
    ]

},
{
    id: 21,
    question: "Which country has provided the most players to the Premier League outside of England?",
    answers: [{ text: "Spain", correct: false },
        { text: "France", correct: true },
        { text: "Brazil", correct: false },
        { text: "Germany", correct: false }
    ]

},
{
    id: 22,
    question: "3 of these teams got relagated in the 2013/14 season, which didn't?",
    answers: [{ text: "Cardiff City", correct: false },
        { text: "Fulham", correct: false },
        { text: "West Brom", correct: true },
        { text: "Norwich City", correct: false }
    ]

},
{
    id: 23,
    question: "Which team finished runner up in the 2008/09 season",
    answers: [{ text: "Manchester United", correct: false },
        { text: "Liverpool", correct: true },
        { text: "Chelsea", correct: false },
        { text: "Arsenal", correct: false }
    ]

},
{
    id: 24,
    question: "Jamie Vardy holds the record for most goals in consecutive games, how many goals did he score?",
    answers: [{ text: "10", correct: false },
        { text: "12", correct: false },
        { text: "11", correct: true },
        { text: "14", correct: false }
    ]

},
{
    id: 25,
    question: "Who was the oldest Premier League manager to take charge of a match?",
    answers: [{ text: "Roy Hodgson", correct: true },
        { text: "Bobby Robson", correct: false },
        { text: "Alex Ferguson", correct: false },
        { text: "Neil Warnock", correct: false }
    ]

},
{
    id: 26,
    question: "Who was the youngest player to ever play in the Premier League",
    answers: [{ text: "Jack Wilshere", correct: false },
        { text: "Harvey Elliott", correct: false },
        { text: "Isaiah Brown", correct: false },
        { text: "Ethan Nwaneri", correct: true }
    ]

},
{
    id: 27,
    question: "Who was the oldest player to play in the Premier League",
    answers: [{ text: "Edwin van der Sar", correct: false },
        { text: "Mark Schwarzer", correct: false },
        { text: "Brad Friedel", correct: false },
        { text: "John Burridge", correct: true }
    ]

},
{
    id: 28,
    question: "Which of these players is one of only 2 players to score a penalty with both feet",
    answers: [{ text: "Peter Odemwingie", correct: false },
        { text: "Steven Gerard", correct: false },
        { text: "Bobby Zamora", correct: true },
        { text: "Dennis Bergkamp ", correct: false }
    ]

},
{
    id: 29,
    question: "Who is the most substituted player in Premier League history",
    answers: [{ text: "Gareth Barry", correct: false },
        { text: "Ryan Giggs", correct: true },
        { text: "John Obi Mikel", correct: false },
        { text: "Mark Noble", correct: false }
    ]

}
]