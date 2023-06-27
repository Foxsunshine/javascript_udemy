import React from "react";
import ReactDom from "react-dom";
import { nanoid } from "nanoid";
import Question from "./components/Question";

//1.先写css，
//2.引入api，引入data。
//3.问题，答案，正确答案，用户选择，表格提交？
//4.题目数量，答对数量

Array.prototype.insert = function(index, item) {
  return this.splice(index, 0, item);
};

export default function App() {
  const [gameStart, setGamestart] = React.useState(false);
  const [questions, setQuestion] = React.useState([]);
  const [isGameEnd, setIsGameEnd] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);

  //initialize questions

  // function initializeQuestions() {}
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const questionList = data.results.map((result) => {
          result.incorrect_answers.insert(
            Math.ceil(Math.random() * result.incorrect_answers.length),
            result.correct_answer
          );

          return {
            ...result,
            id: nanoid(),
            selectedAnswer: "",
            // showAnswer: false,
          };
        });
        setQuestion(questionList);
      });
  }, []);

  //
  function selectAnswer(selectedAnswer, id) {
    setQuestion((preQuestions) =>
      preQuestions.map((question) => {
        console.log(selectedAnswer + " is Clicked");
        return question.id === id
          ? { ...question, selectedAnswer: selectedAnswer }
          : { ...question };
      })
    );
  }

  //
  function checkAnswers() {
    if (questions.every((question) => question.selectedAnswer !== "")) {
      setIsGameEnd(true);
      questions.map((question) => {
        if (question.correct_answer === question.selectedAnswer)
          setCorrectCount((pre) => pre + 1);
      });
    }
    // setIsGameEnd(true);
  }
  // console.log(correctCount);
  // console.log(questions);

  function playAgain() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const questionList = data.results.map((result) => {
          result.incorrect_answers.insert(
            Math.ceil(Math.random() * result.incorrect_answers.length),
            result.correct_answer
          );

          return {
            ...result,
            id: nanoid(),
            selectedAnswer: "",
            // showAnswer: false,
          };
        });
        setQuestion(questionList);
      });
    setGamestart(false);
    setCorrectCount(0);
    setIsGameEnd(false);
  }

  function handleStart() {
    setGamestart(true);
  }

  // const QuestionMenu = ()
  return (
    <main>
      {!gameStart ? (
        <div className="container">
          <div>
            <h3>Quizzical</h3>
            <p>Some description if needed</p>
          </div>
          <button className="start--button" onClick={handleStart}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <Question
            questions={questions}
            selectAnswer={selectAnswer}
            isGameEnd={isGameEnd}
          />
          {!isGameEnd ? (
            <button className="check--answer" onClick={checkAnswers}>
              check answers
            </button>
          ) : (
            <div className="container-result">
              <h4>{`You scored ${correctCount}/${questions.length} correct ${
                correctCount === 1 ? "answer" : "answers"
              }`}</h4>
              <button className="play--again" onClick={playAgain}>
                play again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
