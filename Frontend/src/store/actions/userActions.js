import { ActionTypes } from "./actionTypes";
import { actionConstants } from "../../constant/actionConstant";
import setAuthHeaders from "../../utils/setAuth";
import { setUser, isLoggedIn, removeUser } from "../../utils/auth";

// Helper function for API calls
const apiCall = async (url, method, body = null, headers = {}) => {
    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", ...headers },
            body: body ? JSON.stringify(body) : null,
        });
        return await response.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

// Login action
export const login = (user) => async (dispatch) => {
    try {
        const url = `${actionConstants.baseURL}${actionConstants.authEndpoints.login}`;
        const responseData = await apiCall(url, "POST", user);

        if (responseData.status === "success") {
            const { user } = responseData;
            if (user) setUser(user); // Store user in local storage
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: responseData });
        } else {
            dispatch({ type: ActionTypes.LOGIN_FAILED, payload: responseData.message });
        }
    } catch (error) {
        dispatch({ type: ActionTypes.LOGIN_FAILED, payload: "Login failed. Please try again." });
    }
};

// Load user action
export const loadUser = () => async (dispatch) => {
    if (!isLoggedIn()) return;

    try {
        const url = `${actionConstants.baseURL}${actionConstants.authEndpoints.loadUser}`;
        const responseData = await apiCall(url, "GET", null, setAuthHeaders());

        if (responseData.status === "success") {
            const { user } = responseData;
            if (user) setUser(user); // Update user in local storage
            dispatch({ type: ActionTypes.USER_LOADED, payload: responseData });
        } else {
            dispatch({ type: ActionTypes.AUTH_ERROR, payload: responseData.message });
        }
    } catch (error) {
        dispatch({ type: ActionTypes.AUTH_ERROR, payload: "Failed to load user. Please try again." });
    }
};

// Logout action
export const logout = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("jwtToken");
        const url = `${actionConstants.baseURL}${actionConstants.authEndpoints.logout}`;

        const responseData = await apiCall(url, "POST", null, {
            Authorization: `Bearer ${token}`,
        });

        if (responseData.status === "success") {
            removeUser(); // Clear user data from local storage
            dispatch({ type: ActionTypes.LOGOUT });
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
};