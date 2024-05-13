import React, { useState } from "react";


function QuizComponent({ lesson, id, deleteCourseById, addQuestion }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (quizId, questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [quizId]: {
        ...userAnswers[quizId],
        [questionId]: selectedOption,
      },
    });
  };

  const handleSubmitQuiz = (quizId) => {
    // Calculate score for the specified quiz
    let totalScore = 0;
    lesson.quizzes
      .find((quiz) => quiz._id === quizId)
      .questions.forEach((question) => {
        if (userAnswers[quizId]?.[question._id] === question.answer) {
          totalScore++;
        }
      });
    setScore(totalScore);
    setShowScore(quizId);
  };

  const handleResetQuiz = (quizId) => {
    setShowScore(false);
    setUserAnswers({
      ...userAnswers,
      [quizId]: {}, // Clear selected options for the specified quiz
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {lesson.quizzes &&
        lesson.quizzes.map((quiz) => (
          <div
            key={quiz._id}
            style={{
              width: "90%",
              border: "1px solid green",
              marginBottom: "10px",
              padding: "5px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3 style={{ paddingLeft: "10px", width: "85%" }}>
                {quiz.title}
              </h3>
            </div>
            {quiz.questions &&
              quiz.questions.map((question) => {
                const selectedOption = userAnswers[quiz._id]?.[question._id];
                const isCorrect = selectedOption === question.answer;
                const showAnswer = showScore === quiz._id;

                return (
                  <div
                    key={question._id}
                    style={{
                      width: "90%",
                      border: "1px solid gray",
                      marginBottom: "10px",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <p style={{ paddingLeft: "20px" }}>{question.question}</p>
                    <ul
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {question.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const showCorrectAnswer =
                          showAnswer && isCorrect && selectedOption === option;
                        const showWrongAnswer =
                          showAnswer && !isCorrect && selectedOption === option;

                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name={`question_${quiz._id}_${question._id}`}
                              value={option}
                              checked={isSelected}
                              onChange={() =>
                                handleAnswerClick(
                                  quiz._id,
                                  question._id,
                                  option
                                )
                              }
                              disabled={showAnswer}
                            />
                           
                            <span
                              style={{
                                color: showCorrectAnswer
                                  ? "green"
                                  : showWrongAnswer
                                  ? "red"
                                  : "inherit",
                              }}
                            >
                              {option}
                            </span>
                        
                          </li>
                        );
                      })}
                    
                    </ul>
                    {showAnswer && (
                      <p style={{ color: "green" }}>
                        Correct answer: {question.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            <div>
              <button
                onClick={() => handleSubmitQuiz(quiz._id)}
                disabled={
                  Object.keys(userAnswers[quiz._id] || {}).length !==
                  quiz.questions.length
                }
              >
                Finish
              </button>
              <button onClick={() => handleResetQuiz(quiz._id)}>Reset</button>
            </div>
            {showScore === quiz._id && (
              <div>
                <h3>Your Score: {score}</h3>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default QuizComponent;