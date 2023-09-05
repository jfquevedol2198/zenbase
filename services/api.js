import Axios from "axios";
import config from "../config";
const api = Axios.create({
  baseURL: config.API_URL,
});
api.handleError = (error) => {
  if (error?.response?.data?.error) {
    alert(error?.response?.data?.error);
  }
};
api.interceptors.request.use((request) => {
  console.log(
    `API Request: ${request.method?.toUpperCase()} ${request.url} ${JSON.stringify(request.data, null, 2) || ""
    }`
  );
  return request;
});
api.interceptors.response.use((response) => {
  response.result = response.data?.data || response.data;
  return response;
});
export default api;
