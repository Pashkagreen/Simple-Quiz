const questions = [
    {
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 4,
    },
    {
        question: "Что означает CSS?",
        answers: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        correct: 2,
    },
    {
        question: "Что означает HTML?",
        answers: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis",
        ],
        correct: 1,
    },
    {
        question: "В каком году был создан JavaScript?",
        answers: ["1996", "1995", "1994", "все ответы неверные"],
        correct: 2,
    },
];

// Find Elements
const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')


// Переменные
let score = 0; // Result
let questionIndex = 0; // Текущий вопрос

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;

//Очистка разметки
function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {

    const headerTemplate = `<h2 class="title">%title%</h2>`
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
    headerContainer.innerHTML = title;

// Варианты ответа
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {
        const questionTemplate =
            `<li>
                <label>
                  <input value="%number%" type="radio" class="answer" name="answer" />
                  <span>%answer%</span>
                </label>
             </li>`

        const answerHtml = questionTemplate
            .replace("%answer%", answerText)
            .replace('%number%', answerNumber)

        listContainer.innerHTML += answerHtml;
        answerNumber++
    }
}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input:checked')
    if (!checkedRadio) {
        submitBtn.blur()
        return
    }
    //Узнаем номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value)
    console.log(userAnswer)

    //Узнаем правильный ответ

    if (userAnswer === questions[questionIndex]['correct']) {
        score += 1;
        console.log('score = ', score)
    }

    if(questionIndex === questions.length - 1) {
        console.log("It was a last question")
        clearPage()
        showResults()
        return;
    } else {
        console.log("It wasnt a last question")
        questionIndex++
        clearPage()
        showQuestion()
    }
}

function showResults() {
     const resultTemplate = `<h2 class="title">%title%</h2>
                             <h3 class="summary">%message%</h3>
                             <p class="result">%result%</p>`
    let title, message;
     if (score === questions.length) {
         title = "Мегахорош!"
         message = 'Вы ответили верно на все вопросы!'
     } else if ((score * 100) / questions.length > 50) {
         title = 'Хорош'
         message = 'Вы ответили верно на большую часть вопросов!'
     } else {
         title = 'Пошёл-ка ты нахуй!'
         message = 'Твоя судьба - подохнуть долбаёбом'
     }

     let result = `${score} из ${questions.length}!`

    // Final message
    const finalMessage = resultTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result)
    headerContainer.innerHTML = finalMessage

    //Play again
    submitBtn.blur()
    submitBtn.innerText = 'Начать заново'
    submitBtn.onclick = () => history.go()
}



