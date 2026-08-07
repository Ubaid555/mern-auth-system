import axios from "axios";
import ENV from "../config/env";

const publicApi = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default publicApi;
