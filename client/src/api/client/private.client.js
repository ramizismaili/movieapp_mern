import axios from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:5000/api/v1";


// Creating a private client with Axios and configuring it with the base URL and paramsSerializer
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});


// Adding a request interceptor to add headers to the request before it's sent
privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("actkn")}`,
    },
  };
});


// Adding a response interceptor to process the response from the server
privateClient.interceptors.response.use(
  (response) => {
        // If the response contains data, return it
    if (response && response.data) return response.data;
        // Otherwise, return the whole response
    return response;
  },
  (err) => {
    // If there is an error, throw the response data
    throw err.response.data;
  }
);

export default privateClient;
