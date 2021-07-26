import "tailwindcss/tailwind.css";
import { useState } from "react";
import AppContainer from "../components/appContainer";
import buildClient from "../api/buildClient";

function AppComponent({ Component, pageProps }) {
  console.log(pageProps)
  return (
    <div>
        <AppContainer loggedIn={pageProps?.loggedIn}>
        <Component {...pageProps} />
        </AppContainer>
    </div>
  );
}

// Requests from getInitialProps could be executed from the client or the server but requests
// from the component are always issued by the bro
AppComponent.getInitialProps = async (context) => {
  let pageProps = {};


  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(
      context
    );
  }

  return {
    pageProps
  };
};

export default AppComponent;
