import { Navigate, Outlet } from "react-router-dom";
import { Credit } from "../App";
import { useAuth } from "./auth/AuthProvider";

export const HomeLayout = () => {
    const {user} = useAuth();
    if (user){
        return <Navigate to="/user/home"/>
    }
    return (
        <>
        <Outlet/>
        <Credit/>
        </>
    )
}