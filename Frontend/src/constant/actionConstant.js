const baseURL = "http://localhost:3000"

const Auth ={
    Register:"/api/auth/register",
    Login:"/api/auth/login",
    LoadUser:"/api/auth/user/me"
}

const Action_Constant ={
    baseURL,
    Auth
}

export default Action_Constant