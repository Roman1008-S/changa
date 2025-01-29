const baseURL = "http://localhost:3000";

const authEndpoints = {
    register: "/api/auth/register",
    login: "/api/auth/login",
    loadUser: "/api/auth/user/me",
    logout: "/api/auth/user/logout",

};

const userEndpoints = {
    profileUpdate: "/api/user/profileUpdate",
}

export const actionConstants = {
    baseURL,
    authEndpoints,
    userEndpoints
};