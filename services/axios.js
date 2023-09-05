import Axios from "axios";
// import { config.API_URL } from '@env';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = Axios.create();

axios.defaults.baseURL = config.LEGACY_API_URL;

axios.handleError = (error) => {
  if (error?.response?.data?.error) {
    alert(error?.response?.data?.error);
  }
};

axios.interceptors.request.use(async(request) => {

  const token= await AsyncStorage.getItem('authToken');

  if(token){
  
    request.headers['Authorization'] =token;
  }
  return request;
},
(error)=>{

  Promise.reject(error)
}
);

axios.interceptors.response.use(async(response) => {
  if(response?.data?.data?.token){
    await AsyncStorage.setItem('authToken',response?.data?.data?.token)
  }


  return response;
});

export default axios;
