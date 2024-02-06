import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router";
import { Loader } from "../components/Loader/Loader";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";

export const AssessMe = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

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

  useEffect(() => {
    setQuestions(questionsData);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/get`, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelection = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    // Combine questions, chosen answers, and options into an object
    const result = questions.map((question) => ({
      question: question.question,
      answerChosen: answers[question.id] || "Not answered",
      options: question.options,
    }));
    console.log(result);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar showIcons={true} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">AssessMe</h1>
        <div>
          {questions.map((question) => (
            <div key={question.id} className="mb-4">
              <p className="font-bold">{question.question}</p>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${index}`}
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() => handleAnswerSelection(question.id, option)}
                    className="mr-2"
                  />
                  <label htmlFor={`${question.id}-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
