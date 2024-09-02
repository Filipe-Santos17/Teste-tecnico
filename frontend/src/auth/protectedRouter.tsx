import { ReactElement, useContext } from "react";
import { UserContext } from "@/components/Context";
import { Navigate } from "react-router-dom";
import { iContext } from "@/@types/dataJson";

const ProtectedRouter = ({children} : {children: ReactElement}) => {
  const { login } = useContext(UserContext) as iContext;

  return login ? children : <Navigate to="/login"/>; 
};

export default ProtectedRouter;