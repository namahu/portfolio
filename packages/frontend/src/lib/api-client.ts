import axios  from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  response => {
    console.log(response);
    if (response.status === 200) {
      return response;
    }
    return Promise.reject(response.data);
  },
  error => Promise.reject(error),
);
