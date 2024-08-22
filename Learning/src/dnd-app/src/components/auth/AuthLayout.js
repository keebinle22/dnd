import { Await, useLoaderData, useOutlet } from "react-router-dom"
import AuthProvider from "./AuthProvider";
import { Suspense } from "react";
import { Home } from "../../App";
import ErrorPage from "../ErrorPage";

export const AuthLayout = () => {
    const outlet = useOutlet();
    // const {userPromise} = useLoaderData();
    return(
        // <Suspense fallback={<div>Loading</div>}>
        //     <Await resolve={userPromise} errorElement={<div>AuthLayout Error</div>}
        //     children={
        //         (user) => (
        //         <AuthProvider value={user ? {user: user.username, role: user.role.type} : null}>
        //             {outlet}
        //         </AuthProvider>

        //         )
        //     }>
        //     </Await>
        // </Suspense>
        <AuthProvider>
            {outlet}
        </AuthProvider>
    )
}