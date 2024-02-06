import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    document
      .getElementById("startBtn")
      .addEventListener("click", this.startQuiz.bind(this));
  }

  async startQuiz() {
    let category = document.getElementById("category").value;
    let difficulty = Array.from(document.getElementsByName("difficulty")).find(
      (elm) => {
        return elm.checked;
      }
    ).value;
    let numberOfQuestions = document.getElementById("numberOfQuestions").value;
    const API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;

    let questions = await this.fetchData(API);

    if (questions.length > 0) {
      $("#setting").fadeOut(500, () => {
        $("#alert").fadeOut(100);
        $("#quiz").fadeIn(500);

        let quiz = new Quiz(questions);
      });
    } else {
      $("#alert1").fadeIn(100);
    }
  }

  async fetchData(url) {
    let res = await fetch(url);
    res = await res.json();
    return res.results;
  }
}
