import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true
});

instance.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    // Xử lý lỗi toàn cục
    return Promise.reject(error);
  }
);


export default instance