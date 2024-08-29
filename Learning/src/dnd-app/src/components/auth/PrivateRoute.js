import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
    const auth = useAuth();
    if (!auth.user){
        return <Navigate to="/login"/>;
    }
    return (
    <>
        <nav>
            <div id="nav-btn">
                <button className="actionbutton" type="button" onClick={() => auth.logOutAction()}>Logout</button>
            </div>
        </nav>
        <Outlet/>
    </>
    )
}
export default PrivateRoute;
