
// // paymentService.js
// import setupAxios from "./index";

// const baseUrl = 'http://localhost:3004/api/payments'; // Base URL for payment API

// // Set up axios instance for payment service
// const api = setupAxios(baseUrl);

// // Function to initiate checkout and get payment URL
// export async function initiateCheckout(items) {
//   try {
//     const response = await api.post('/checkout', { items });
//     const data = await response.data;
//     return data.url;
//   } catch (error) {
//     console.error('Error initiating checkout:', error);
//     throw error;
//   }
// }

// // Other payment-related functions can be added here, such as processing payments, handling refunds, etc.

import axios from "axios";

const baseUrl = 'http://localhost:3004/api/payments'; // Base URL for payment API

// Set up axios instance for payment service
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to initiate checkout and get payment URL
export async function initiateCheckout(items) {
  try {
    const response = await api.post('/checkout', { items });
    const data = await response.data;
    return data.url;
  } catch (error) {
    console.error('Error initiating checkout:', error);
    throw error;
  }
}
