const httpProtocol = "http";

const APP_CONFIG = {
  apiUrl:
    `${httpProtocol}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/graphql` ||
    "",
};

export default APP_CONFIG;
