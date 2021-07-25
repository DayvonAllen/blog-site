import "tailwindcss/tailwind.css";
import { useState } from "react";
import AppContainer from "../components/appContainer";

function AppComponent({ Component, pageProps }) {
  const [status, setStatus] = useState(0)

  return (
    <div>
        <AppContainer {...pageProps}>
        <Component setStatus={setStatus} {...pageProps} />
        </AppContainer>
    </div>
  );
}

// Requests from getInitialProps could be executed from the client or the server but requests
// from the component are always issued by the bro
AppComponent.getInitialProps = async (appContext) => {
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext,
    );
  }

  return {
    pageProps
  };
};

export default AppComponent;
