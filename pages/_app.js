import "tailwindcss/tailwind.css";
import SideMenu from "../components/menu";
import Login from "../components/login";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setLogin] = useState(false);

  console.log(isLoggedIn)

  return (
    <div>
      {!isLoggedIn && <Login setLogin={setLogin} />}
      {isLoggedIn && (
        <SideMenu setLogin={setLogin} isLoggedIn={isLoggedIn} >
          <Component {...pageProps} />
        </SideMenu>
      )}
    </div>
  );
}

export default MyApp;
