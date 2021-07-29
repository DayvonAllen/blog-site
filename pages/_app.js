import "tailwindcss/tailwind.css";
import AppContainer from "../components/appContainer";
import { AuthProvider } from "../context/AuthContext";
function AppComponent({ Component, pageProps }) {
  return (
      <AuthProvider>
         <AppContainer>
        <Component {...pageProps} />
        </AppContainer>
      </AuthProvider>
  );
}

// Requests from getInitialProps could be executed from the client or the server but requests
// use getStaticProps or getServerSideProps instead(newer version)
AppComponent.getInitialProps = async (context) => {
  let pageProps = {};

  console.log(context)

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
