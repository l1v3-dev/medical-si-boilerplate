import { CREATE_MESSAGE } from "./message";
import { CREATE_USER, UPDATE_USER } from "./user";

const mutations = {
  user: { CREATE_USER, UPDATE_USER },
  message: { CREATE_MESSAGE },
};

export default mutations;
