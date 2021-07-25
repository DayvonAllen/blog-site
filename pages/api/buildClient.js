import axios from "axios";

const buildClient = ({ req }) => {

  axios.defaults.withCredentials = true
  // means you are rendering from the server
  if (typeof window === "undefined") {
    // return a preconfigured version of axios
    return axios.create({
      baseURL: "http://localhost:8082/"
    });
  }
  // we are on the browser
  else {
    return axios.create({
      baseURL: "http://localhost:8082/"
    });
  }
};

export default buildClient;