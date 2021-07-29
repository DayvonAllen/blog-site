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
export async function getServerSideProps(context) {
  let pageProps = {};

  return {
    props: {
      pageProps
    }
  };
};

export default AppComponent;
