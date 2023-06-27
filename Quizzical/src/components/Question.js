import React from "react";
import { decode } from "html-entities";
import ReactDOM from "react-dom";
import { random } from "nanoid";

Array.prototype.insert = function(index, item) {
  return this.splice(index, 0, item);
};

export default function Question(props) {
  //render question list.
  const element = props.questions.map((question) => {
    // render answer list
    const elementAnswer = question.incorrect_answers.map((answer) => {
      // style block
      let answerStyles = {};
      if (!props.isGameEnd) {
        answerStyles = {
          backgroundColor: question.selectedAnswer === answer ? "#D6DBF5" : "",
          border:
            question.selectedAnswer === answer ? "none" : "1px solid #293264",
        };
      } else {
        if (
          question.selectedAnswer === answer &&
          question.selectedAnswer === question.correct_answer
        ) {
          answerStyles = {
            color: "#293264",
            backgroundColor: "#94D7A2",
            border: "none",
          };
        } else if (
          question.selectedAnswer === answer &&
          question.selectedAnswer !== question.correct_answer
        ) {
          answerStyles = {
            color: "#9095AE",
            backgroundColor: "#F8BCBC",
            border: "none",
          };
        } else {
          answerStyles = {
            color: "#9095AE",
            backgroundColor: "none",
            border: "1px solid #9095AE",
          };
        }
      }

      console.log(answerStyles);
      return (
        <div
          className="answer"
          onClick={() => props.selectAnswer(answer, question.id)}
          style={answerStyles}
        >
          {decode(answer)}
        </div>
      );
    });

    return (
      <div className="container--question" key={question.id}>
        <h1 className="question">{decode(question.question)}</h1>
        <div className="container--answer">{elementAnswer}</div>
        <hr></hr>
      </div>
    );
  });
  return <div>{element}</div>;
}
