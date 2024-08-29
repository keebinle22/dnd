import { useOutlet } from "react-router-dom";
import { Credit } from "../../App";
import AuthProvider from "./AuthProvider";

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
            <Credit/>
        </AuthProvider>
    )
}