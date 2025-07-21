import React, { useState } from "react";
import "../Quiz.css";
import questions from "../constant.js"

// console.log("Loaded questions:", questions);

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const next = currentQuestion + 1;
      if (next < questions.length) {
        setCurrentQuestion(next);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="quiz">
        <h3>🎉 Quiz Complete!</h3>
        <p>
          You got {score} out of {questions.length} correct.
        </p>
        <button className="restart" onClick={restartQuiz}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-card card">
      <p className="card-title">Quiz 🥇</p>
      <div className="card-body">
        <h3 className="card-subtitle">{questions[currentQuestion].question}</h3>
        <ul className="quiz-options">
          {questions[currentQuestion].options.map((option, idx) => (
            <li
              key={idx}
              className={`quiz-option ${
                selectedOption !== null
                  ? idx === questions[currentQuestion].answer
                    ? "correct"
                    : idx === selectedOption
                    ? "wrong"
                    : ""
                  : ""
              }`}
              onClick={() => selectedOption === null && handleAnswer(idx)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
