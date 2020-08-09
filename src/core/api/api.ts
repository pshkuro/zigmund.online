import axios from "axios";

export const createApi = () => {
  const api = axios.create({
    baseURL: `https://api.github.com/`,
  });

  return api;
};
