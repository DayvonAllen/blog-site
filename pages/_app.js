import "tailwindcss/tailwind.css";
import SideMenu from "../components/sideMenu";
import Login from "../components/login";
import { useState } from "react";
import buildClient from "./api/buildClient";

function AppComponent({ Component, pageProps }) {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <div>
      {!isLoggedIn && <Login setLogin={setLogin} />}
      {isLoggedIn && (
        <SideMenu setLogin={setLogin} isLoggedIn={isLoggedIn}>
          <Component {...pageProps} />
        </SideMenu>
      )}
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client
    );
  }
  return {
    pageProps,
  };
};

export default AppComponent;
