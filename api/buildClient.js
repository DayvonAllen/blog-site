import axios from "axios";

const buildClient = ({ req }) => {
  // means you are rendering from the server
  if (typeof window === "undefined") {
    // return a preconfigured version of axios
    return axios.create({
      baseURL: "http://admin-srv",
      headers: req.headers,
    });
  }
  // we are on the browser
  else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
