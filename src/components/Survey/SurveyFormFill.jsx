import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const api = 'http://localhost:3000/api';
import { submitSurveyResponse, getSurveyById } from '../../redux/actions/surveyActions';

const SurveyFormFill = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [responses, setResponses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const survey = useSelector((state) => state.survey.currentSurvey);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        await dispatch(getSurveyById(id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchSurvey();
  }, [dispatch, id]);

  const handleChange = (questionId, value) => {
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      const existingResponseIndex = updatedResponses.findIndex((response) => response.questionId === questionId);

      if (existingResponseIndex !== -1) {
        // Update existing response
        updatedResponses[existingResponseIndex].answer = value;
      } else {
        // Add new response
        updatedResponses.push({ questionId, answer: value });
      }

      return updatedResponses;
    });
  };

  const handleSubmit = async () => {
    try {
      const isValid = validateResponses();
      if (!isValid) {
        window.alert('Please fill or select at least one option for each question.');
        return;
      }
      
      const answersArray = responses.map((response) => response.answer);
      
      await dispatch(submitSurveyResponse(id, { answers: answersArray }));
      setSubmitted(true);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        window.alert('You cannot submit more responses for the next 1 hour.');
      } else {
        console.error(error);
      }
    }
  };

  const validateResponses = () => {
    // Iterate through survey questions and validate responses
    for (const question of survey.questions) {
      const responseValue = responses.find((response) => response.questionId === question._id);

      if (question.type === 'multiple-choice') {
        // For multiple-choice questions, at least one option should be selected
        if (!responseValue || !responseValue.answer) {
          return false;
        }
      } else if (question.type === 'text-input') {
        // For text-input questions, the response should not be empty
        if (!responseValue || !responseValue.answer || responseValue.answer.trim() === '') {
          return false;
        }
      }
    }

    return true;
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{survey.title}</h2>
      <form>
        {survey.questions.map((question) => (
          <div key={question._id}>
            <h4>{question.content}</h4>
            {question.type === 'multiple-choice' ? (
              <div>
                {question.options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      onChange={(e) => handleChange(question._id, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={(responses.find((response) => response.questionId === question._id) || {}).answer || ''}
                onChange={(e) => handleChange(question._id, e.target.value)}
              />
            )}
          </div>
        ))}
        <button type="button" onClick={handleSubmit} disabled={submitted}>
          Submit Survey
        </button>
        {submitted && <p>Survey submitted successfully!</p>}
      </form>
    </div>
  );
};

export default SurveyFormFill;
