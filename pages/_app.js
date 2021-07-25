import "tailwindcss/tailwind.css";
import SideMenu from "../components/sideMenu";
import Login from "./auth/login";
import { useState } from "react";
import buildClient from "./api/buildClient";
import axios from "axios";
import Router from "next/router";

function AppComponent({ Component, pageProps }) {
  const [status, setStatus] = useState(0)

  return (
    <div>
        <SideMenu status={status} pageProps={pageProps}>
          <Component setStatus={setStatus}{...pageProps} />
        </SideMenu>
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  // const data = await axios
  //   .get("http://admin-srv/control/posts", { withCredentials: true })
  //   .catch((err) => console.log("err"));

  const data = {}

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      data
    );
  }

  return {
    pageProps,
  };
};

export default AppComponent;
