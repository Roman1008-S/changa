import { ActionTypes } from "../actions/actionTypes";

// Retrieve token from local storage
const pre_Token = localStorage.getItem("jwtToken");
const token = pre_Token ? JSON.parse(pre_Token) : null;

// Initial state of the auth reducer
const initialState = {
  token: token,
  isAuth: !!token, // Set `isAuth` to true if a token exists
  userInfo: null,
  role: ""
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.LOGIN_SUCCESS:
      // Save token in local storage
      localStorage.setItem("jwtToken", JSON.stringify(payload.token));
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        userInfo: payload.user,
        role: payload.role
      };

    case ActionTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        userInfo: payload.user,
        role: payload.role
      };

    case ActionTypes.LOGIN_FAILED:
    case ActionTypes.LOGOUT:
      // Clear token and user data on logout or login failure
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        token: null,
        isAuth: false,
        userInfo: null,
      };

    default:
      return state;
  }
};