// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SurveyForm from './components/Survey/SurveyForm';
import Home from './Home'
import SurveyFormFill from './components/Survey/SurveyFormFill';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<Home/>}/> */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/survey/create" element={<SurveyForm />} />
            <Route path="/survey/:id" element={<SurveyFormFill />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
