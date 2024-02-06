export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.totalNumberOfQuestions = questions.length;
    this.score = 0;
    this.correctAns;

    this.showQuestion();

    document
      .getElementById("next")
      .addEventListener("click", this.nextQuestion.bind(this));

    document.getElementById("tryBtn").addEventListener("click", () => {
      location.reload();
    });
  }

  showQuestion() {
    document.getElementById("currentQuestion").innerHTML =
      this.currentQuestion + 1;
    document.getElementById("totalNumberOfQuestions").innerHTML =
      this.totalNumberOfQuestions;

    document.getElementById("question").innerHTML =
      this.questions[this.currentQuestion].question;

    this.correctAns = this.questions[this.currentQuestion].correct_answer;
    let answers = [...this.questions[this.currentQuestion].incorrect_answers];

    const randomNumber = Math.ceil(Math.random() * answers.length); // random number to shufle array
    answers.splice(randomNumber, 0, this.correctAns);

    console.log(this.correctAns);
    console.log(answers);

    let answersContainer = ``;
    for (let i = 0; i < answers.length; i++) {
      answersContainer += `
      <label class="form-check-label">
      <input type="radio" class="form-check-input" name="answer" value="${answers[i]}"
          >
          ${answers[i]}
  </label> <br/>
      `;
    }
    document.getElementById("rowAnswer").innerHTML = answersContainer;
  }

  nextQuestion() {
    let userAnswerElement = Array.from(
      document.getElementsByName("answer")
    ).find((el) => el.checked)?.value;

    if (userAnswerElement != undefined) {
      $("#alert").fadeOut(100);
      this.checkUserAnswer(userAnswerElement, this.correctAns);

      this.currentQuestion++;
      console.log(this.currentQuestion <= this.questions.length - 1);

      if (this.currentQuestion < this.questions.length - 1) {
        this.showQuestion();
      } else {
        $("#quiz").fadeOut(500, () => {
          $("#finish").fadeIn(500);
        });

        document.getElementById("score").innerHTML = this.score;
      }
    } else {
      $("#alert").fadeIn(500);
    }
  }

  checkUserAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
      $("#Correct").fadeIn(500).fadeOut(200);
      this.score++;
    } else {
      $("#inCorrect").fadeIn(500).fadeOut(200);
    }
  }
}
