import { useEffect, useState } from "react";
import SideMenu from "./sideMenu";
import { useRouter } from "next/router";

function AppContainer({ children }) {
  const [status, setStatus] = useState(0);

  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, []);

  const pageProps = {};

  return (
    <div>
      {router.pathname === "/" ? (
        children
      ) : (
        <SideMenu status={status} pageProps={pageProps}>
          {children}
        </SideMenu>
      )}
    </div>
  );
}

// This function always runs first
export async function getStaticProps(context) {

  return {
    props: {},
  };
}

export default AppContainer;
