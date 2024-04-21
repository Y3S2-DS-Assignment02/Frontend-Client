import setupAxios from "./index";

// let url = process.env.BASE_USER_URL;
let url = "http://localhost:3001/api/user-service";

//pass the url to the setupAxios function
const api = setupAxios(url);

export const login = async (email, password) => {
    try {
        const response = await api.post(`${url}/login`, { email, password });
        console.log(response)
        return response.data; 
    } catch (error) {
        console.error(error);
        return false;
    } 
}

