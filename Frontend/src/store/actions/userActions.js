import { ActionTypes } from "./actionTypes";
import Action_Constant from "../../constant/actionConstant";
import setAuthHeaders from "../../utils/setAuth";
import { setUser, isLoggedIn } from "../../utils/auth"

export const login = (user) => async (dispatch) => {
    try {
        const url = Action_Constant.baseURL + Action_Constant.Auth.Login;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        const responseData = await response.json();

        if (responseData.status === "success") {
            const { user } = responseData;
            user && setUser(user);
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: responseData });
        }
        if (responseData.status === "failed") {
            dispatch({ type: ActionTypes.LOGIN_FAILED });
        }

    } catch (error) {
        dispatch({ type: ActionTypes.LOGIN_FAILED });
    }
};

export const loadUser = () => async dispatch => {
    if (!isLoggedIn()) return;
    try {
        const url = Action_Constant.baseURL + Action_Constant.Auth.LoadUser;
        const response = await fetch(url, {
            method: 'GET',
            headers: setAuthHeaders()
        });
        const responseData = await response.json();
        if (responseData.status === "success") {
            const { user } = responseData;
            user && setUser(user);
            dispatch({ type: ActionTypes.USER_LOADED, payload: responseData });
        } else {
            dispatch({ type: ActionTypes.AUTH_ERROR });
        }
    } catch (error) {
        dispatch({ type: ActionTypes.AUTH_ERROR });
    }
};
