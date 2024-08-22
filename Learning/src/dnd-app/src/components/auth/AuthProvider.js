import { createContext, useContext, useMemo, useState } from "react";
import { curToken, url } from "../../App";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../LocalStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // const isLogin = useAsyncValue();
    const [user, setUser] = useLocalStorage("user", null);
    const [role, setRole] = useLocalStorage("role", null);
    const navigate = useNavigate();

    const loginAction = async () => {
        const init = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        };
        console.log(init)
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
        }
        //how to display error if 403 (& more)?
    }

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