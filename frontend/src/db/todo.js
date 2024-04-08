import axios from "axios";
import conf from "../conf/conf";

const addTodo = (data) => {
  return axios
    .post(`${conf.backendTodoUrl}/add`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

const getTodo = () => {
  return axios
    .get(`${conf.backendTodoUrl}/get`)
    .then((res) => res.data.data)
    .catch((error) => {
      console.log(error);
    });
};


export {  getTodo,addTodo};
