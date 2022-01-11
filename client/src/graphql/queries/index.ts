import { GET_MESSAGE_LIST, GET_MESSAGE_THREAD } from "./message";
import { GET_ALL_USERS, GET_ONE_USER } from "./user";

const queries = {
  user: {
    GET_ALL_USERS,
    GET_ONE_USER,
  },
  message: {
    GET_MESSAGE_LIST,
    GET_MESSAGE_THREAD,
  },
};

export default queries;
