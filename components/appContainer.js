import SideMenu from "./sideMenu";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";


function AppContainer({ children }) {
  const router = useRouter();

  const {user, logout} = useContext(AuthContext)

  return (
    <div>
      {(router.pathname === "/" || router.route === "/404") ? (
        children
      ) : (
        <SideMenu logout={logout}>
          {children}
        </SideMenu>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let auth = false

  if(context?.ctx?.req?.headers?.cookie) {
    console.log("ran")
    return {
      redirect: {
      destination: "/home",
    }}
  } 

  return {
    props: {
      auth
    }
  };
};


export default AppContainer;
