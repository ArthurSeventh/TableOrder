import { useContext } from "react";
import { loginContext } from "../App";
import { Navigate } from "react-router-dom";



function ProtectedRoute({children}) {

    const context = useContext(loginContext);
    // console.log(`Protected route ${context.is_auth}`);
    if(!context.is_auth)
    {
        return <Navigate to="/login"/>
    }
    else{
        return children
    }
}

export default ProtectedRoute;