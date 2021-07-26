import "tailwindcss/tailwind.css";
import AppContainer from "../components/appContainer";

function AppComponent({ Component, pageProps }) {
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
