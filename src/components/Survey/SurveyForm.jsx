import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSurvey } from '../../redux/actions/surveyActions';
import ClipboardJS from 'clipboard';

const SurveyForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    questions: [],
  });
  const [surveyCreated, setSurveyCreated] = useState(false);
  const [surveyID, setSurveyID] = useState('');

  const { title, questions } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...questions, { content: '', type: 'text-input' }],
    });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].content = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options = [...(updatedQuestions[index].options || []), ''];
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createSurvey(formData));

    setSurveyID(response);

    if (response) {
      setSurveyCreated(true);
    }
  };

  const copySurveyLink = () => {
    const baseURL = window.location.origin;
    const surveyLink = `${baseURL}/survey/${surveyID}`;

    const clipboard = new ClipboardJS('.copy-button', {
      text: function () {
        return surveyLink;
      },
    });

    clipboard.on('success', function (e) {
      alert(`Survey link copied to clipboard: ${surveyLink}`);
      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Unable to copy. Please manually copy the link.');
    });

    const copyButton = document.getElementById('copyButton');
    copyButton.click();
  };

  return (
    <div>
      <h2>Create Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={handleChange} required />

        <h3>Questions:</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <label>{`Question ${index + 1}:`}</label>
            <input
              type="text"
              value={question.content}
              onChange={(e) => handleQuestionChange(index, e)}
              required
            />

            <label>Type:</label>
            <select
              value={question.type || 'text-input'}
              onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
            >
              <option value="text-input">Text Input</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>

            {question.type === 'multiple-choice' && (
              <div>
                <h4>Options:</h4>
                {question.options &&
                  question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label>{`Option ${optionIndex + 1}:`}</label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      />
                    </div>
                  ))}
                <button type="button" onClick={() => handleAddOption(index)}>
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Create Survey</button>
      </form>

      {surveyCreated && (
        <>
          <button
            id="copyButton"
            className="copy-button"
            style={{ display: 'none' }}
            data-clipboard-text=""
          >
            Copy Link
          </button>
          <button type="button" onClick={copySurveyLink}>
            Copy Survey Link
          </button>
        </>
      )}
    </div>
  );
};

export default SurveyForm;
