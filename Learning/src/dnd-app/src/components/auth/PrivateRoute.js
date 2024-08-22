import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider"

const PrivateRoute = () => {
    const auth = useAuth();
    if (!auth.user){
        return <Navigate to="/login"/>;
    } 
    return (
    <>
        <nav>
            <button className="actionbutton" type="button" onClick={() => auth.logOutAction()}>Logout</button>
        </nav>
        <Outlet/>
    </>
    )
}
export default PrivateRoute;