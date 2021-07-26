import { useEffect, useState } from "react";
import SideMenu from "./sideMenu";
import { useRouter } from "next/router";

function AppContainer({ children, loggedIn }) {
  const router = useRouter();

  return (
    <div>
      {router.pathname === "/" ? (
        children
      ) : (
        <SideMenu loggedIn={loggedIn}>
          {children}
        </SideMenu>
      )}
    </div>
  );
}

// This function always runs first
AppContainer.getInitialProps= async function({ req }) {
    const loggedIn = req?.headers?.cookie || false
    return {
      props: {
        loggedIn,
      },
    };
  }

export default AppContainer;
