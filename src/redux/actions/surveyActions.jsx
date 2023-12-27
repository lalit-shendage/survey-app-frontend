// src/redux/actions/surveyActions.js
import axios from 'axios';
const api='http://localhost:3000/api'

// Action Types
export const CREATE_SURVEY = 'CREATE_SURVEY';
export const GET_SURVEY_BY_ID = 'GET_SURVEY_BY_ID';
export const SUBMIT_SURVEY_RESPONSE = 'SUBMIT_SURVEY_RESPONSE';


const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  'auth-token': token,
};
// Action Creators
export const createSurvey = (surveyData) => async (dispatch) => {
  try {
    const response = await axios.post(`${api}/survey/create`, surveyData,{headers});
    const surveyID = response.data.surveyID;
    

    dispatch({ type: CREATE_SURVEY, payload: surveyID });
    return surveyID;
  } catch (error) {
    console.error('Error creating survey:', error);
  }
};

export const getSurveyById = (surveyId) => async (dispatch) => {
  try {
    
    const response = await axios.get(`${api}/survey/${surveyId}`);
    const survey = response.data;
    dispatch({ type: GET_SURVEY_BY_ID, payload: survey });
  } catch (error) {
    console.error('Error getting survey by ID:', error);
  }
};

export const submitSurveyResponse = (surveyId, response) => async (dispatch) => {
  if (!surveyId || !response) {
    console.error('Invalid surveyId or response');
    return;
  }

  try {
    await axios.post(`${api}/survey/submit/${surveyId}`, response, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: SUBMIT_SURVEY_RESPONSE });
  } catch (error) {
    console.error('Error submitting survey response:', error);
  }
};

