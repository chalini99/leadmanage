import axios from "axios";

const API = axios.create({
  baseURL: "https://leadmanage-06jt.onrender.com/api"
});

export default API;