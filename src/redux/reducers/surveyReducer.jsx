import { CREATE_SURVEY, GET_SURVEY_BY_ID, SUBMIT_SURVEY_RESPONSE } from '../actions/surveyActions';

const initialState = {
  surveys: [],          
  currentSurvey: null,   
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SURVEY:
      return {
        ...state,
        surveys: [...state.surveys, action.payload],
      };
    case GET_SURVEY_BY_ID:
      return {
        ...state,
        currentSurvey: action.payload,
      };
    case SUBMIT_SURVEY_RESPONSE:
      return state;
    default:
      return state;
  }
};

export default surveyReducer;
