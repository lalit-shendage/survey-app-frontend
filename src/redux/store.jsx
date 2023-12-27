// store/configureStore.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import surveyReducer from './reducers/surveyReducer';


const store = configureStore({
  reducer: {
    auth: authReducer,
    survey: surveyReducer,
  },
});

export default store;
