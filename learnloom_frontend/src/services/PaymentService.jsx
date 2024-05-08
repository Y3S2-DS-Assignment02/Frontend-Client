import setupAxios from "./index";
let url = process.env.REACT_APP_PAYMENTS_BASE_API;

//Create the axios instance for API calls
const api = setupAxios(url);


export const getAllPayments = async()=>{
    try{

        const response = await api.get(`${url}/getAllPayments`);
        return response.data;

    }catch(error){
        console.error(error);
        throw error;

    }
}


export const checkout = async(paymentData) =>{
    try{
        const response = await api.post(`${url}/checkout`,paymentData);
        return response.data;
    }catch(error){
        console.error(error);
        throw error
    }
}