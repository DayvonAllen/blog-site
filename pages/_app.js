import "tailwindcss/tailwind.css";
import SideMenu from "../components/menu";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <SideMenu>
        <Component {...pageProps} />
      </SideMenu>
    </div>
  );
}

export default MyApp;
