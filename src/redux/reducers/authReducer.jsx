// reducers/authReducer.js
const initialState = {
  token: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload,
        error: null,
        isAuthenticated: true,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case 'SIGNUP_FAIL':
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        error: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
