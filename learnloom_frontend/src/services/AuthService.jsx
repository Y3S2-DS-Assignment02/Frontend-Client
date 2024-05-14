import setupAxios from "./index";

let url = process.env.REACT_APP_AUTH_BASE_API;

//Create the axios instance for API calls
const api = setupAxios(url);

//Login API call
export const login = async (email, password) => {
    try {
        const response = await api.post(`${url}/login`, { email, password });
        console.log(response.data.data)
        saveToken(response.data.data.token)
        saveUserId(response.data.data.userId)
        saveRole(response.data.data.role)
        return response.status === 200 ? true : false;
    } catch (error) {
        console.error(error);
        throw error;
    } 
}

//Register Learner API call
export const registerLearner = async (username, email, password, phoneNumber, fullname) => {
    try {
        const response = await api.post(`${url}/register-learner`, { username, email, password, phoneNumber, fullname });
        console.log(response.status)
        if(response.status === 201) {
            saveToken(response.data.data.token)
            saveUserId(response.data.data.userId)
            saveRole(response.data.data.role)
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

//Register Instructor API call
export const registerInstructor = async (username, email, password, phoneNumber, fullname) => {
    try {
        const response = await api.post(`${url}/register-instructor`, { username, email, password, phoneNumber, fullname });
        console.log(response.status)
        if(response.status === 201) {
            saveToken(response.data.data.token)
            saveUserId(response.data.data.userId)
            saveRole(response.data.data.role)
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const logout = () => {
    dumpLocalStorageTokens();
}

const saveToken = (token) => {
    localStorage.setItem("token", token);   
    return true;    
}

const saveUserId = (userId) => {
    localStorage.setItem("userId", userId); 
    return true;
}

const saveRole = (role) => {
    localStorage.setItem("role", role);   
    return true;    
}

const dumpLocalStorageTokens = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
}


