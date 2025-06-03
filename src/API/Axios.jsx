import axios from "axios";

const axiosInstance = axios.create({
  // local instance of fire base functions
//   baseURL: "http://127.0.0.1:5001/clone-93b3c/us-central1/api",
  // deployed version of firebase function
    baseURL: "https://api-qabhq7ydtq-uc.a.run.app/",
  // deployed virsion of amazon server on render.com
  // baseURL: "https://amazon-api-76qq.onrender.com/",
});
export { axiosInstance };
