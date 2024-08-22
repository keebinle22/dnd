import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    console.error(error);
    return(
        <>
        <div>
            <h1>Error</h1>
            <p>
                {/* <i>{error.statusText || error.message}</i>
                <i>{error.data}</i> */}
            </p>
        </div>
        </>
    )
}
export default ErrorPage;