import setupAxios from "./index";

// let url = process.env.BASE_USER_URL;
let url = "http://localhost:3001/api/user-service";

//Create the axios instance for API calls
const api = setupAxios(url);

export const login = async (email, password) => {
    try {
        const response = await api.post(`${url}/login`, { email, password });
        saveToken(response.data.data.token)
        return response.status === 200 ? true : false;
    } catch (error) {
        console.error(error);
        throw error;
    } 
}

export const registerLearner = async (username, email, password, phoneNumber, fullname) => {
    try {
        const response = await api.post(`${url}/register-learner`, { username, email, password, phoneNumber, fullname });
        if(response.status === 201) {
            saveToken(response.data.data.token)
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const saveToken = (token) => {
    localStorage.setItem("token", token);   
    return true;    
}



