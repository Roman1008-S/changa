import { ActionTypes } from "../actions/actionTypes";

let pre_Token = localStorage.getItem("token");
let token = pre_Token ? JSON.parse(pre_Token) : null;

const initialState = {
  token: token,
  isAuth: false,
  userInfo: [],
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('jwtToken', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        userInfo: payload.user
      };
    case ActionTypes.USER_LOADED:
      return {
        ...state,
        ...payload,
        isAuth: true,
        userInfo: payload.user
      };
    case ActionTypes.LOGIN_FAILED:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
