import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:3102",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosAuth;
