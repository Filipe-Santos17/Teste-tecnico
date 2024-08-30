import { ReactElement, useContext } from "react";
import { UserContext } from "@/components/Context";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({children} : {children: ReactElement}) => {
  const { login } = useContext(UserContext) as { login: boolean };

  if(login === true){
    return children
  } else if(login === false){
    return <Navigate to="/login"/>; 
  } else {
    return <></>
  }
};

export default ProtectedRouter;