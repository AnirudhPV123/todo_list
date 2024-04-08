import axios from "axios";
import conf from "../conf/conf";

const userSignUp = (data) => {
  return axios
    .post(`${conf.backendUserPath}/register`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

const userLogin = (data) => {
  return axios
    .post(`${conf.backendUserPath}/login`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

const getCurrentUser = () => {
  return axios
    .get(`${conf.backendUserPath}/user`)
    .then((res) => res)
    .catch((error) => {
      throw error
    });
};

const refreshToken = ()=>{
  console.log("refresh")
    return axios
      .post(`${conf.backendUserPath}/refresh-token`)
      .then((res) => {
        return res
      })
      .catch((error) => {
        console.log(error)
        throw error;

      });
}

const userLogout = ()=>{
  console.log("here")
    return axios
      .post(`${conf.backendUserPath}/logout`)
      .then((res) => res)
      .catch((error) => {
        throw error;
      });
}

export { userSignUp, userLogin, getCurrentUser,refreshToken ,userLogout };
