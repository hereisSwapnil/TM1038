import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Loader } from "../components/Loader/Loader";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import "./AssessMe.css";
import { get100Questions } from "../utils/gemini";

export const AssessMe = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0); // Track the current step

  // Sample questions JSON data
  const questionsData = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
    // Add more questions here...
  ];

  // useEffect(() => {
  //   setQuestions(questionsData);
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/get`, {
  //       withCredentials: true,
  //     });
  //     setUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAnswerSelection = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    // Show result for the current question
    setCurrentStep(currentStep + 1);

    // Automatically move to the next question after 5 seconds
  };

  const renderQuestions = () => {
    const question = questions[currentStep];

    return (
      <div key={question.id} className="question mb-4">
        <p>{question.question}</p>
        {question.options.map((option, index) => (
          <div key={index} className="options flex items-center">
            <input
              type="radio"
              id={`${question.id}-${index}`}
              name={`question-${question.id}`}
              value={option}
              onChange={() => handleAnswerSelection(question.id, option)}
              checked={answers[question.id] === option}
              className="mr-2"
            />
            <label htmlFor={`${question.id}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-4">
        {currentStep < questions.length && (
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const renderResult = () => {
    const result = questions.map((question) => ({
      question: question.question,
      answerChosen: answers[question.id] || "Not answered",
      correctAnswer: question.correctAnswer,
      options: question.options,
    }));
    console.log(result);
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Result</h2>
        {result.map((item, index) => (
          <div key={index} className="mb-2">
            <p>{item.question}</p>
            <p>Chosen Answer: {item.answerChosen}</p>
            <p>Correct Answer: {item.correctAnswer}</p>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const response = await get100Questions({
        interest: "Programming",
        skills: "cpp, azure, javascript",
      });
      // console.log(response);
      setQuestions(response);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar showIcons={true} />
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">AssessMe</h1>
        <div className="questionContainer">
          {currentStep === questions.length
            ? renderResult()
            : renderQuestions()}
        </div>
        {renderNavigationButtons()}
      </div>
    </>
  );
};
