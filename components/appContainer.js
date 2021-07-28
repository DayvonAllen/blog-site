import { useEffect, useState } from "react";
import SideMenu from "./sideMenu";
import { useRouter } from "next/router";

function AppContainer({ children }) {
  const router = useRouter();

  return (
    <div>
      {router.pathname === "/" ? (
        children
      ) : (
        <SideMenu>
          {children}
        </SideMenu>
      )}
    </div>
  );
}


export default AppContainer;
