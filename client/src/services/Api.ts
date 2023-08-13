import axios from "axios";
axios.defaults.withCredentials = true;
export default () => {
  return axios.create({
    baseURL: `http://209.38.239.212:3000/`,
    //baseURL: `http://localhost:3000/`,
  });
};
