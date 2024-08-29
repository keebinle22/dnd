import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../App";
import { useLocalStorage } from "../LocalStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // const isLogin = useAsyncValue();
    const [user, setUser] = useLocalStorage("user", null);
    const [role, setRole] = useLocalStorage("role", null);
    const [newLogin, setNewLogin] = useState();
    const navigate = useNavigate();
    const loginAction = async () => {
        const init = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        };
        const acct = await fetch(`${url}/users/me`, init)
            .then(resp => {
                switch (resp.status) {
                    case 200:
                        return resp.json();
                    case 403:
                        return resp.json();
                    default:
                        return Promise.reject("Something went wrong here");
                }
            })
            .catch(err => console.error(err));
        if (acct.username){
            setUser(acct.username);
            setRole(acct.role.type);
            if (newLogin == null){
                setNewLogin(true);
            } else {
                setNewLogin(!newLogin);
            }
        }
        //how to display error if 403 (& more)?
    }
    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
            // console.log('Delayed message after 2 seconds!');
            logOutAction();
        }, 59 * 60000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [newLogin]); // Empty dependency array ensures the effect runs only once

    const logOutAction = () => {
        setUser(null);
        setRole(null);
        window.localStorage.removeItem("token");
        console.log("LOGOUT")
        console.log(value);
        navigate("/")
    }
    
    const value = useMemo(() => ({
        user,
        role,
        loginAction,
        logOutAction
    }), [user])
    return (
        <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        </>
    )
};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}