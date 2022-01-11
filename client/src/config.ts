const httpProtocol = process.env.REACT_APP_USE_SSL ? "http" : "http";

const APP_CONFIG = {
  apiUrl:
    `${httpProtocol}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/graphql` ||
    "",
};

export default APP_CONFIG;
